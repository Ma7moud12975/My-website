import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { AdaptiveDpr } from '@react-three/drei';
import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import * as THREE from 'three';
import { useSceneStore } from './sceneStore';

gsap.registerPlugin(ScrollTrigger);

const vertexShader = `
precision highp float;
attribute vec3 aShape0; attribute vec3 aShape1; attribute vec3 aShape2; attribute vec3 aShape3; attribute vec3 aShape4;
attribute vec3 aColor; attribute float aSeed; attribute float aRole; attribute float aScale; attribute float aOpacity;
uniform float uStage; uniform float uTime; uniform vec2 uPointer; uniform float uMobile; uniform float uReduced;
varying vec3 vColor; varying float vAlpha;
void formation(float stage, out vec3 source, out vec3 target, out float local) {
  float safeStage = clamp(stage, 0.0, 3.9999);
  float segment = floor(safeStage);
  local = fract(safeStage);
  if (segment < 0.5) { source = aShape0; target = aShape1; return; }
  if (segment < 1.5) { source = aShape1; target = aShape2; return; }
  if (segment < 2.5) { source = aShape2; target = aShape3; return; }
  source = aShape3; target = aShape4;
}
void main() {
  vec3 source; vec3 target; float localProgress;
  formation(uStage, source, target, localProgress);
  float morph = smoothstep(.28, .76, localProgress);
  morph = morph * morph * (3.0 - 2.0 * morph);
  float loosen = smoothstep(.13, .38, localProgress) * (1.0 - smoothstep(.72, .91, localProgress));
  float travel = sin(morph * 3.14159265);
  float detached = smoothstep(.18, .86, loosen + fract(aSeed * 19.31) * .34);
  vec3 center = mix(source, target, morph);
  center.x = mix(center.x, center.x * 0.54, uMobile);
  center.y = mix(center.y, center.y * .76 - .38, uMobile);
  vec3 delta = target - source;
  vec3 arcAxis = normalize(vec3(-delta.y + .001, delta.x + .001, .4 + fract(aSeed * 7.1)));
  center += arcAxis * travel * detached * (.08 + fract(aSeed * 23.7) * .34);
  float turbulence = loosen * detached * (1.0 - uReduced) * (.08 + fract(aSeed * 4.73) * .22);
  vec3 flow = vec3(
    sin(aSeed * 37.1 + uTime * .38) + sin(center.y * 3.4 + aSeed * 9.0),
    cos(aSeed * 25.7 + uTime * .31) + sin(center.x * 2.8 - aSeed * 7.0),
    sin(aSeed * 13.9 + uTime * .35)
  );
  center += flow * turbulence;
  float atmosphere = smoothstep(.88, 1.0, aRole);
  vec3 atmosphereVector = vec3(sin(aSeed*41.7), cos(aSeed*29.3), sin(aSeed*17.9));
  center += atmosphereVector * atmosphere * (.7 + fract(aSeed*31.1) * 1.35);
  center.z += (aRole - .5) * (.5 + atmosphere * .85);
  center += vec3(sin(uTime*.14+aSeed*8.), cos(uTime*.11+aSeed*6.), sin(uTime*.13+aSeed*5.)) * (1.0-uReduced) * mix(.006,.025,atmosphere);
  float depthParallax = .18 + clamp((center.z + 1.5) / 3.0, 0.0, 1.0) * .2;
  center.xy += uPointer * depthParallax * (1.0-uReduced);
  float spin = aSeed*9. + uTime*(.025+fract(aSeed*3.)*.045)*(1.0-uReduced);
  mat2 rotation = mat2(cos(spin),-sin(spin),sin(spin),cos(spin));
  vec3 particle = position;
  particle.xy = rotation * particle.xy;
  float tilt = sin(aSeed * 18.0 + uTime * .045) * .52;
  particle.yz = mat2(cos(tilt),-sin(tilt),sin(tilt),cos(tilt)) * particle.yz;
  float depthScale = mix(.76, 1.24, clamp((center.z + 1.6) / 3.2, 0.0, 1.0));
  particle *= aScale * depthScale * (1.0 + loosen * .16);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(center + particle, 1.0);
  float focus = 1.0 - smoothstep(1.15, 2.4, abs(center.z));
  vColor = aColor * (.62 + focus * .28 + loosen * .08);
  vAlpha = aOpacity * mix(.36, 1.0, focus) * mix(1.0, .5, atmosphere);
}`;

const fragmentShader = `precision mediump float; varying vec3 vColor; varying float vAlpha; void main(){gl_FragColor=vec4(vColor,vAlpha);}`;

let randomState = 2031;
const random = () => { randomState = (randomState * 1664525 + 1013904223) >>> 0; return randomState / 4294967296; };
const palette = ['#d8d4cc','#d8d4cc','#d8d4cc','#8c857f','#d89a32','#d89a32','#7b55c7','#7b55c7','#477d70','#a96a92'].map(color => new THREE.Color(color));
const cameraFrames = [
  new THREE.Vector3(.08, 0, 5.95),
  new THREE.Vector3(-.16, .03, 5.5),
  new THREE.Vector3(.12, -.08, 5.82),
  new THREE.Vector3(-.1, .06, 5.58),
  new THREE.Vector3(0, 0, 6.08),
];
const cameraTargets = [
  new THREE.Vector3(.12, .02, 0),
  new THREE.Vector3(-.12, .04, 0),
  new THREE.Vector3(.08, -.04, 0),
  new THREE.Vector3(-.08, .02, 0),
  new THREE.Vector3(0, 0, 0),
];

function writePoint(data: Float32Array, index: number, x: number, y: number, z: number) {
  data[index * 3] = x; data[index * 3 + 1] = y; data[index * 3 + 2] = z;
}

function brainFormation(count: number) {
  const data = new Float32Array(count * 3);
  for (let index = 0; index < count; index += 1) {
    let x = 0, y = 0;
    const stem = random() < .055;
    if (stem) {
      x = .18 + (random() - .5) * .28;
      y = -.88 - random() * .48;
    } else {
      for (let attempt = 0; attempt < 80; attempt += 1) {
        x = (random() * 2 - 1) * 1.48; y = (random() * 2 - 1) * 1.08;
        const main = ((x + .05) / 1.42) ** 2 + ((y - .04) / .98) ** 2 < 1;
        const frontal = ((x + .94) / .68) ** 2 + ((y + .03) / .78) ** 2 < 1;
        const crown = ((x + .15) / 1.12) ** 2 + ((y - .58) / .58) ** 2 < 1;
        const lowerCut = ((x + .74) / .7) ** 2 + ((y + .91) / .42) ** 2 < 1;
        if ((main || frontal || crown) && !lowerCut) break;
      }
    }
    const edge = Math.sqrt(Math.max(0, 1 - Math.min(1, (x / 1.55) ** 2 + (y / 1.28) ** 2)));
    const z = (random() * 2 - 1) * (stem ? .2 : .14 + edge * .58);
    const fold = Math.sin(x * 8.5 + y * 5.2) * .035 + Math.sin(y * 10.0 - x * 2.5) * .025;
    writePoint(data, index, 1.64 + x * .9, .08 + y * .78, z + fold);
  }
  return data;
}

function bulbFormation(count: number) {
  const data = new Float32Array(count * 3);
  for (let index = 0; index < count; index += 1) {
    const lane = random();
    let x: number, y: number, z: number;
    if (lane < .64) {
      const a = random() * Math.PI * 2;
      const radius = Math.sqrt(random()) * (1.1 - .16 * Math.cos(a * 2));
      x = Math.cos(a) * radius;
      y = .48 + Math.sin(a) * radius * 1.05;
      if (y < -.15) x *= .65 + (y + 1.0) * .28;
      z = (random() * 2 - 1) * Math.sqrt(Math.max(0, 1 - (radius / 1.12) ** 2)) * .62;
    } else if (lane < .94) {
      const band = Math.floor(random() * 5);
      y = -.48 - band * .16 + (random() - .5) * .065;
      x = (random() * 2 - 1) * (.5 - band * .035);
      z = (random() - .5) * .34;
    } else {
      const t = random(); y = -.05 + t * .68; x = (t - .5) * (random() < .5 ? -.72 : .72); z = (random() - .5) * .12;
    }
    writePoint(data, index, -1.72 + x, y, z);
  }
  return data;
}

function closingFormation(count: number) {
  const data = new Float32Array(count * 3);
  for (let index = 0; index < count; index += 1) {
    const t = index / count, angle = t * Math.PI * 48, radius = .22 + 1.62 * Math.sqrt(t);
    writePoint(data, index, Math.cos(angle) * radius, Math.sin(angle) * radius * .63, Math.sin(t * Math.PI * 17) * .5 + (random() - .5) * .25);
  }
  return data;
}

async function sampleImageFormation(url:string,count:number,offsetX:number,width:number,height:number) {
  const image=await new Promise<HTMLImageElement>((resolve,reject)=>{const element=new Image();element.onload=()=>resolve(element);element.onerror=reject;element.src=url;});
  const size=360, canvas=document.createElement('canvas'); canvas.width=size; canvas.height=size;
  const context=canvas.getContext('2d',{willReadFrequently:true}); if(!context) throw new Error('Unable to sample portfolio image');
  const scale=Math.min(size/image.naturalWidth,size/image.naturalHeight), drawWidth=image.naturalWidth*scale, drawHeight=image.naturalHeight*scale;
  context.drawImage(image,(size-drawWidth)/2,(size-drawHeight)/2,drawWidth,drawHeight);
  const pixels=context.getImageData(0,0,size,size).data, candidates:Array<[number,number,number]>=[];
  for(let y=0;y<size;y+=2) for(let x=0;x<size;x+=2){const pointer=(y*size+x)*4,alpha=pixels[pointer+3],light=(pixels[pointer]+pixels[pointer+1]+pixels[pointer+2])/3;if(alpha>38&&light>9)candidates.push([x,y,light]);}
  const data=new Float32Array(count*3);
  for(let index=0;index<count;index+=1){const sample=candidates[Math.floor(random()*candidates.length)]??[size/2,size/2,128];data[index*3]=offsetX+(sample[0]/size-.5)*width;data[index*3+1]=-(sample[1]/size-.5)*height;data[index*3+2]=(sample[2]/255-.5)*.52+(random()-.5)*.16;}
  return data;
}

function ParticleMorph(){
  const material=useRef<THREE.ShaderMaterial>(null);
  const mesh=useRef<THREE.Mesh>(null);
  const {viewport,pointer,camera}=useThree();
  const [geometry,setGeometry]=useState<THREE.InstancedBufferGeometry|null>(null);
  const count=useMemo(()=>window.innerWidth<700?3600:7600,[]);
  const targetStage=useSceneStore(state=>state.stage), reducedMotion=useSceneStore(state=>state.reducedMotion), paused=useSceneStore(state=>state.paused), motionTime=useRef(0);
  const pointerTarget=useRef(new THREE.Vector2()), cameraTarget=useRef(new THREE.Vector3());
  const shader=useMemo(()=>new THREE.ShaderMaterial({uniforms:{uStage:{value:0},uTime:{value:0},uPointer:{value:new THREE.Vector2()},uMobile:{value:window.innerWidth<700?1:0},uReduced:{value:0}},vertexShader,fragmentShader,transparent:true,depthWrite:false,depthTest:true,blending:THREE.NormalBlending,side:THREE.DoubleSide}),[]);

  useEffect(()=>{let active=true;randomState=2031;Promise.all([Promise.resolve(brainFormation(count)),Promise.resolve(bulbFormation(count)),sampleImageFormation('/quadpod-neon.png',count,-1.7,3.75,3.25),sampleImageFormation('/firefighter-neon.png',count,1.65,3.75,3.45),Promise.resolve(closingFormation(count))]).then(shapes=>{
    if(!active)return;
    const next=new THREE.InstancedBufferGeometry(), vertices:number[]=[];
    for(let side=0;side<6;side+=1){const a=(side/6)*Math.PI*2,b=((side+1)/6)*Math.PI*2;vertices.push(0,0,0,Math.cos(a)*.012,Math.sin(a)*.012,0,Math.cos(b)*.012,Math.sin(b)*.012,0);}
    next.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));
    shapes.forEach((shape,index)=>next.setAttribute(`aShape${index}`,new THREE.InstancedBufferAttribute(shape,3)));
    const colors=new Float32Array(count*3),seeds=new Float32Array(count),roles=new Float32Array(count),scales=new Float32Array(count),opacities=new Float32Array(count);
    for(let index=0;index<count;index+=1){
      const role=random(), color=palette[Math.floor(random()*palette.length)], shade=.7+random()*.32;
      colors.set([color.r*shade,color.g*shade,color.b*shade],index*3); seeds[index]=random(); roles[index]=role;
      scales[index]=role<.16?.7+random()*.28:role>.82?1.0+random()*.48:.78+random()*.34;
      opacities[index]=role<.16?.28+random()*.28:role>.88?.18+random()*.28:.52+random()*.4;
    }
    next.setAttribute('aColor',new THREE.InstancedBufferAttribute(colors,3)); next.setAttribute('aSeed',new THREE.InstancedBufferAttribute(seeds,1));
    next.setAttribute('aRole',new THREE.InstancedBufferAttribute(roles,1)); next.setAttribute('aScale',new THREE.InstancedBufferAttribute(scales,1)); next.setAttribute('aOpacity',new THREE.InstancedBufferAttribute(opacities,1));
    next.instanceCount=count; setGeometry(previous=>{previous?.dispose();return next;});
  });return()=>{active=false;};},[count]);

  useEffect(()=>()=>{geometry?.dispose();shader.dispose();},[geometry,shader]);
  useFrame((_state,delta)=>{
    if(!material.current)return;
    if(!paused&&!reducedMotion)motionTime.current+=delta;
    const stage=THREE.MathUtils.clamp(targetStage,0,4), segment=Math.min(3,Math.floor(stage)), local=stage-segment, cameraEase=THREE.MathUtils.smoothstep(local,.08,.92);
    material.current.uniforms.uStage.value=stage; material.current.uniforms.uTime.value=motionTime.current;
    pointerTarget.current.set(pointer.x,pointer.y); material.current.uniforms.uPointer.value.lerp(pointerTarget.current,reducedMotion?1:.035);
    material.current.uniforms.uMobile.value=viewport.width<6?1:0; material.current.uniforms.uReduced.value=reducedMotion?1:0;
    camera.position.lerpVectors(cameraFrames[segment],cameraFrames[segment+1],cameraEase);
    cameraTarget.current.lerpVectors(cameraTargets[segment],cameraTargets[segment+1],cameraEase); camera.lookAt(cameraTarget.current);
    if(mesh.current){mesh.current.rotation.y=(stage-.5)*.025;mesh.current.rotation.x=Math.sin(stage*.8)*.012;}
  });
  if(!geometry)return null;
  return <mesh ref={mesh} geometry={geometry} frustumCulled={false}><primitive ref={material} object={shader} attach="material"/></mesh>;
}

function useScrollDirection(){
  const setStage=useSceneStore(state=>state.setStage),setReducedMotion=useSceneStore(state=>state.setReducedMotion);
  useEffect(()=>{const media=matchMedia('(prefers-reduced-motion: reduce)'),updateMotion=()=>setReducedMotion(media.matches);updateMotion();media.addEventListener('change',updateMotion);
    const updateStage=()=>{const points=Array.from(document.querySelectorAll<HTMLElement>('[data-scene]')).map(element=>({element,stage:Number(element.dataset.scene??0),center:element.offsetTop+element.offsetHeight*.5})).sort((a,b)=>a.center-b.center),position=window.scrollY+window.innerHeight*.5;if(!points.length)return;let left=points[0],right=points[points.length-1];for(let index=0;index<points.length-1;index+=1){if(position>=points[index].center&&position<=points[index+1].center){left=points[index];right=points[index+1];break;}}const progress=THREE.MathUtils.smoothstep(position,left.center,right.center),stage=THREE.MathUtils.lerp(left.stage,right.stage,progress);setStage(stage);document.documentElement.style.setProperty('--master-stage',String(stage));points.forEach(point=>{const distance=Math.abs(position-point.center)/Math.max(window.innerHeight*.9,point.element.offsetHeight*.72),reveal=1-THREE.MathUtils.smoothstep(distance,.08,1);point.element.style.setProperty('--scene-reveal',String(reveal));point.element.style.setProperty('--scene-image',String(.55+reveal*.45));point.element.style.setProperty('--scene-dim',String(.48-reveal*.42));});};
    const lenis=media.matches?null:new Lenis({duration:1.05,smoothWheel:true,wheelMultiplier:.92}),ticker=(time:number)=>lenis?.raf(time*1000);lenis?.on('scroll',ScrollTrigger.update);gsap.ticker.add(ticker);gsap.ticker.lagSmoothing(0);const trigger=ScrollTrigger.create({start:0,end:'max',onUpdate:updateStage,onRefresh:updateStage});updateStage();return()=>{media.removeEventListener('change',updateMotion);trigger.kill();gsap.ticker.remove(ticker);lenis?.destroy();};
  },[setReducedMotion,setStage]);
}

export function PersistentScene(){
  useScrollDirection();
  return <div className="persistent-scene" aria-hidden="true"><Canvas dpr={[1,1.5]} camera={{position:[0,0,5.95],fov:48}} gl={{antialias:true,alpha:true,powerPreference:'high-performance'}}><ParticleMorph/><AdaptiveDpr pixelated/><EffectComposer multisampling={0}><Bloom intensity={.32} luminanceThreshold={.72} luminanceSmoothing={.18} mipmapBlur/><Vignette eskil={false} offset={.3} darkness={.48}/></EffectComposer></Canvas></div>;
}
