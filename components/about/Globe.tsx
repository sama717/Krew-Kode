"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import borders from "@/lib/content/world-borders.json";

const D = Math.PI / 180;
const R = 2.2;
const LAT = 30.04 * D;
const LON = 31.23 * D;

const vector = (lat: number, lon: number, radius = R) =>
  new THREE.Vector3(
    radius * Math.cos(lat) * Math.sin(lon),
    radius * Math.sin(lat),
    radius * Math.cos(lat) * Math.cos(lon),
  );

type GlobeProps = {
  label: string;
  hint: string;
  est: string;
};

export default function Globe({ label, hint, est }: GlobeProps) {
  const boxRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const box = boxRef.current;
    const labelElement = labelRef.current;
    if (!box || !labelElement) return;

    const root = document.documentElement;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const token = (name: string) =>
      getComputedStyle(root).getPropertyValue(name).trim();

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    const canvas = renderer.domElement;
    canvas.className = "about-globe-canvas";
    canvas.setAttribute("aria-hidden", "true");
    box.prepend(canvas);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 60);
    const tilt = new THREE.Group();
    const spin = new THREE.Group();
    tilt.rotation.x = -0.08;
    tilt.add(spin);
    scene.add(tilt);

    const positions: number[] = [];
    (borders as number[][]).forEach((line) => {
      for (let i = 2; i < line.length; i += 2) {
        const a = [line[i - 2] / 10, line[i - 1] / 10];
        const b = [line[i] / 10, line[i + 1] / 10];
        const segments = Math.max(
          1,
          Math.ceil(
            Math.max(Math.abs(b[0] - a[0]), Math.abs(b[1] - a[1])) / 2,
          ),
        );
        for (let k = 0; k < segments; k++) {
          const p = vector(
            (a[1] + ((b[1] - a[1]) * k) / segments) * D,
            (a[0] + ((b[0] - a[0]) * k) / segments) * D,
            R * 1.002,
          );
          const q = vector(
            (a[1] + ((b[1] - a[1]) * (k + 1)) / segments) * D,
            (a[0] + ((b[0] - a[0]) * (k + 1)) / segments) * D,
            R * 1.002,
          );
          positions.push(p.x, p.y, p.z, q.x, q.y, q.z);
        }
      }
    });
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3),
    );
    const lineMaterial = new THREE.LineBasicMaterial({
      transparent: true,
      opacity: 0.85,
    });
    spin.add(new THREE.LineSegments(lineGeometry, lineMaterial));

    const coreMaterial = new THREE.MeshBasicMaterial();
    const coreGeometry = new THREE.SphereGeometry(R, 64, 48);
    spin.add(new THREE.Mesh(coreGeometry, coreMaterial));

    const paint = document.createElement("canvas");
    let landMask: Uint8ClampedArray | null = null;
    let texture: THREE.CanvasTexture | null = null;
    const rgb = (cssColor: string) => {
      const color = { r: 0, g: 0, b: 0 };
      new THREE.Color(cssColor).getRGB(color, THREE.SRGBColorSpace);
      return color;
    };
    const fillLand = () => {
      if (!landMask || !texture) return;
      const sphereColor = rgb(token("--globe-sphere"));
      const lineColor = rgb(token("--globe-line"));
      const landColor = {
        r: sphereColor.r + (lineColor.r - sphereColor.r) * 0.36,
        g: sphereColor.g + (lineColor.g - sphereColor.g) * 0.36,
        b: sphereColor.b + (lineColor.b - sphereColor.b) * 0.36,
      };
      const context = paint.getContext("2d");
      if (!context) {
        console.error("Unable to create the globe texture canvas context.");
        return;
      }
      const image = context.createImageData(paint.width, paint.height);
      for (let i = 0; i < landMask.length; i += 4) {
        const amount = landMask[i] / 255;
        image.data[i] = 255 * (sphereColor.r + (landColor.r - sphereColor.r) * amount);
        image.data[i + 1] =
          255 * (sphereColor.g + (landColor.g - sphereColor.g) * amount);
        image.data[i + 2] =
          255 * (sphereColor.b + (landColor.b - sphereColor.b) * amount);
        image.data[i + 3] = 255;
      }
      context.putImageData(image, 0, 0);
      texture.needsUpdate = true;
    };

    let disposed = false;
    const image = new Image();
    image.onload = () => {
      if (disposed) return;
      paint.width = image.width;
      paint.height = image.height;
      const sourceCanvas = document.createElement("canvas");
      sourceCanvas.width = image.width;
      sourceCanvas.height = image.height;
      const context = sourceCanvas.getContext("2d", {
        willReadFrequently: true,
      });
      if (!context) {
        console.error("Unable to read the globe land mask.");
        return;
      }
      context.drawImage(image, 0, 0);
      landMask = context.getImageData(
        0,
        0,
        sourceCanvas.width,
        sourceCanvas.height,
      ).data;
      texture = new THREE.CanvasTexture(paint);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.wrapS = THREE.RepeatWrapping;
      texture.offset.x = 0.25;
      texture.anisotropy = 4;
      coreMaterial.map = texture;
      coreMaterial.color.set("white");
      coreMaterial.needsUpdate = true;
      fillLand();
    };
    image.onerror = () => {
      console.error("Unable to load the globe land mask.");
    };
    image.src = "/globe/land-mask.png";

    const pin = new THREE.Group();
    pin.position.copy(vector(LAT, LON, R * 1.002));
    pin.lookAt(pin.position.clone().multiplyScalar(2));
    spin.add(pin);
    const pinMaterial = new THREE.MeshStandardMaterial({
      roughness: 0.3,
      metalness: 0.1,
    });
    const pinHeight = 0.15;
    const needleGeometry = new THREE.CylinderGeometry(
      0.004,
      0.007,
      pinHeight,
      12,
    );
    const needle = new THREE.Mesh(needleGeometry, pinMaterial);
    needle.rotation.x = Math.PI / 2;
    needle.position.z = pinHeight / 2;
    pin.add(needle);
    const headGeometry = new THREE.SphereGeometry(0.03, 32, 24);
    const head = new THREE.Mesh(headGeometry, pinMaterial);
    head.position.z = pinHeight + 0.018;
    pin.add(head);
    const pulseMaterial = new THREE.MeshBasicMaterial({
      transparent: true,
      side: THREE.DoubleSide,
    });
    const pulseGeometry = new THREE.RingGeometry(0.9, 1, 48);
    const pulse = new THREE.Mesh(pulseGeometry, pulseMaterial);
    pin.add(pulse);

    scene.add(new THREE.AmbientLight("white", 1.4));
    const sun = new THREE.DirectionalLight("white", 1.6);
    sun.position.set(2, 4, 6);
    scene.add(sun);

    const applyTheme = () => {
      lineMaterial.color.set(token("--globe-line"));
      pinMaterial.color.set(token("--globe-line"));
      pulseMaterial.color.set(token("--globe-line"));
      if (!texture) coreMaterial.color.set(token("--globe-sphere"));
      fillLand();
    };
    applyTheme();
    const themeObserver = new MutationObserver(applyTheme);
    themeObserver.observe(root, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    const tangent = Math.tan(17.5 * D);
    const resize = () => {
      const width = box.clientWidth;
      const height = box.clientHeight;
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.position.z = (R * 1.03) / (camera.aspect * tangent);
      camera.updateProjectionMatrix();
      tilt.position.y = camera.position.z * tangent * 0.88 - R;
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(box);
    resize();

    let dragging = false;
    let lastX = 0;
    let offset = reduceMotion ? 0 : 2.4;
    let lastFrameTime = performance.now() / 1000;
    const onPointerDown = (event: PointerEvent) => {
      dragging = true;
      lastX = event.clientX;
      canvas.setPointerCapture(event.pointerId);
    };
    const onPointerMove = (event: PointerEvent) => {
      if (!dragging) return;
      offset += (lastX - event.clientX) * 0.006;
      lastX = event.clientX;
    };
    const onPointerUp = () => {
      dragging = false;
    };
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerUp);

    const headWorld = new THREE.Vector3();
    const normal = new THREE.Vector3();
    const toCamera = new THREE.Vector3();
    let frameId = 0;
    const frame = () => {
      frameId = 0;
      if (!visible) return;
      const time = performance.now() / 1000;
      const delta = Math.min(time - lastFrameTime, 0.05);
      lastFrameTime = time;
      if (!dragging && !reduceMotion) {
        offset = THREE.MathUtils.damp(offset, 0, 1.2, delta);
      }
      spin.rotation.y =
        -LON + offset + (reduceMotion ? 0 : Math.sin(time * 0.3) * 0.06);
      const pulseProgress = reduceMotion ? 0.5 : (time % 2.2) / 2.2;
      pulse.scale.setScalar(0.025 + pulseProgress * 0.09);
      pulseMaterial.opacity = reduceMotion ? 0.5 : 1 - pulseProgress;
      renderer.render(scene, camera);
      scene.updateMatrixWorld();
      head.getWorldPosition(headWorld);
      normal.copy(headWorld).sub(tilt.position).normalize();
      toCamera.copy(camera.position).sub(headWorld).normalize();
      const projected = headWorld.clone().project(camera);
      labelElement.style.transform = `translate(${((projected.x + 1) / 2) * box.clientWidth + 32}px, ${((1 - projected.y) / 2) * box.clientHeight}px) translateY(-50%)`;
      labelElement.style.opacity = normal.dot(toCamera) > 0.15 ? "1" : "0";
      frameId = requestAnimationFrame(frame);
    };

    let visible = false;
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !frameId) {
        frameId = requestAnimationFrame(frame);
      } else if (!visible && frameId) {
        cancelAnimationFrame(frameId);
        frameId = 0;
      }
    });
    visibilityObserver.observe(box);

    return () => {
      disposed = true;
      image.onload = null;
      image.onerror = null;
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      themeObserver.disconnect();
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);
      [lineGeometry, coreGeometry, needleGeometry, headGeometry, pulseGeometry].forEach(
        (geometry) => geometry.dispose(),
      );
      [lineMaterial, coreMaterial, pinMaterial, pulseMaterial].forEach((material) =>
        material.dispose(),
      );
      texture?.dispose();
      renderer.dispose();
      canvas.remove();
    };
  }, []);

  return (
    <div
      ref={boxRef}
      className="about-globe-scene"
    >
      <span
        ref={labelRef}
        className="about-globe-label"
        dir="ltr"
      >
        {label}
      </span>
      <span className="about-globe-hint about-globe-start">
        {hint}
      </span>
      <span className="about-globe-hint about-globe-end">
        {est}
      </span>
    </div>
  );
}
