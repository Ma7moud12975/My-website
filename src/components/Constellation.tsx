import { useEffect, useRef, useState, type RefObject } from 'react';

type Props = { progress: RefObject<number>; paused: boolean };
type Particle = { target: number[]; scatter: number[]; color: number[]; seed: number; size: number; ambient: number };

const vertexSource = `
precision highp float;
attribute vec3 aTarget;
attribute vec3 aScatter;
attribute vec3 aColor;
attribute vec3 aMeta;
attribute vec3 aCorner;
uniform vec2 uResolution;
uniform vec2 uPointer;
uniform float uTime;
uniform float uProgress;
uniform float uIntro;
uniform float uMobile;
varying vec3 vColor;
varying vec3 vBary;
varying float vAlpha;
void main() {
  float seed = aMeta.x;
  float ambient = aMeta.z;
  float shift = smoothstep(.16, .46, uProgress);
  float disperse = smoothstep(.64, .94, uProgress);
  float assembly = uIntro * (1. - disperse) * (1. - ambient);
  vec3 target = aTarget;
  float breath = 1. + .016 * sin(uTime * .65 + target.y * 3.);
  target *= breath;
  target += .012 * vec3(sin(uTime*.5+seed), cos(uTime*.4+seed*2.), sin(uTime*.6+seed*3.));
  float rotation = -.42 + sin(uTime*.19)*.38 + shift*.72 + uPointer.x*.17;
  float c = cos(rotation), s = sin(rotation);
  target.xz = mat2(c,-s,s,c) * target.xz;
  float tilt = -.1 + uPointer.y*.1 + sin(uTime*.23)*.035;
  target.xy = mat2(cos(tilt),-sin(tilt),sin(tilt),cos(tilt))*target.xy;
  vec3 scatter = aScatter;
  scatter.x += .12 * sin(uTime*.17 + seed);
  scatter.y += .15 * cos(uTime*.13 + seed*1.7);
  scatter.z += .16 * sin(uTime*.2 + seed*.7);
  vec3 position = mix(scatter, target, assembly);
  float depth = 3.8 / (3.8 - position.z);
  float baseScale = mix(min(uResolution.x*.225,uResolution.y*.40), min(uResolution.x*.40,uResolution.y*.245),uMobile);
  float zoom = 1. + shift*.12 + disperse*.12;
  vec2 center = vec2(uResolution.x * mix(.72, .28, shift), uResolution.y*.47);
  center = mix(center, vec2(uResolution.x*.5,uResolution.y*.69),uMobile);
  center = mix(center, uResolution*.5,disperse);
  vec2 screen = center + position.xy * baseScale * zoom * depth;
  vec2 pointer = vec2((uPointer.x*.5+.5)*uResolution.x,(uPointer.y*.5+.5)*uResolution.y);
  vec2 delta = screen-pointer;
  float distance = length(delta);
  screen += normalize(delta + vec2(.01)) * 24. * exp(-distance*distance/13000.) * assembly;
  float size = aMeta.y * depth * mix(1.,.77,uMobile);
  float spin = seed + uTime * mix(.15,.32,ambient);
  vec2 corner = aCorner.xy * size;
  corner = mat2(cos(spin),-sin(spin),sin(spin),cos(spin))*corner;
  screen += corner;
  vec2 clip = screen / uResolution * 2. - 1.;
  gl_Position = vec4(clip.x,-clip.y,0.,1.);
  vBary = vec3(aCorner.z == 0. ? 1. : 0., aCorner.z == 1. ? 1. : 0., aCorner.z == 2. ? 1. : 0.);
  float front = smoothstep(-1.,.85,position.z);
  vAlpha = mix(.2,.9,front) * mix(1.,.58,ambient);
  vAlpha *= .85 + .15 * sin(seed*3. + uTime*.6);
  vec2 quietZone = (screen-uResolution*.5)/vec2(uResolution.x*.36,uResolution.y*.31);
  vAlpha *= (1. - disperse*.42) * (1. - disperse*.8*exp(-dot(quietZone,quietZone)));
  vColor = aColor * mix(.8,1.12,front);
}`;
const fragmentSource = `
precision mediump float;
varying vec3 vColor;
varying vec3 vBary;
varying float vAlpha;
void main() {
  float edge = min(vBary.x,min(vBary.y,vBary.z));
  float line = 1. - smoothstep(.04,.19,edge);
  float fill = .10;
  gl_FragColor = vec4(vColor, vAlpha * (line + fill));
}`;

function createParticles(count: number) {
  let state = 2026;
  const random = () => { state = (state * 1664525 + 1013904223) >>> 0; return state / 4294967296; };
  const palette = [[1,.70,.13],[.91,.87,.91],[.52,.30,1],[.64,.39,.91],[.12,.63,.51],[.93,.54,.72]];
  const particles: Particle[] = [];
  for (let i=0; i<count; i++) {
    const stem = i > count*.945;
    const side = i % 2 === 0 ? 1 : -1;
    const hemisphereIndex = Math.floor(i / 2);
    const v = Math.acos(1 - 2 * (hemisphereIndex + .5) / Math.ceil(count / 2));
    const u = hemisphereIndex * 2.399963229728653;
    // Separate convoluted hemispheres give the silhouette a deep central fissure.
    const ridge = Math.sin(u*7 + 1.8*Math.sin(v*4)) * Math.cos(v*9+Math.sin(u*3));
    const fold = 1 + .085*ridge + .025*Math.sin(u*17+v*13);
    const x = side * (.39 + Math.sin(v)*Math.cos(u)*.57*fold);
    const y = Math.cos(v)*.82*fold - .09;
    const z = Math.sin(v)*Math.sin(u)*.73*fold;
    let target = [x, y, z];
    if(stem) { const t=random(); const a=random()*Math.PI*2; target=[.09+Math.cos(a)*.08*(1-t*.55), .62+t*.34, -.25+Math.sin(a)*.09+t*.12]; }
    const band = Math.sin(u*2+v*5) + ridge*.5;
    const paletteIndex = band > .56 ? 0 : band < -.6 ? 2 : random() < .50 ? 1 : 3+Math.floor(random()*3);
    particles.push({ target, scatter:[(random()-.5)*6.6,(random()-.5)*5.4,(random()-.5)*3.8], color:palette[paletteIndex], seed:random()*30, size:1.4+random()*.9, ambient:0 });
  }
  for(let i=0;i<170;i++) {
    particles.push({target:[0,0,0],scatter:[(random()-.5)*7,(random()-.5)*4.5,(random()-.5)*3],color:palette[i%palette.length],seed:random()*30,size:i<28?5+random()*9:1+random()*2,ambient:1});
  }
  return particles;
}

export function Constellation({progress,paused}:Props) {
  const ref=useRef<HTMLCanvasElement>(null);
  const [revision, setRevision] = useState(0);
  const pausedRef=useRef(paused);
  useEffect(()=>{pausedRef.current=paused;},[paused]);
  useEffect(()=>{
    const canvas=ref.current;
    if(!canvas)return;
    const particles=createParticles(window.innerWidth<700?4200:8000);
    const gl=canvas.getContext('webgl',{alpha:false,antialias:true,powerPreference:'high-performance',premultipliedAlpha:false});
    let render: (time:number,intro:number)=>void;
    let dispose=()=>{};
    let width=1,height=1;
    let pointer=[0,0], targetPointer=[0,0];
    let contextLost=false;
    if(gl){
      const compile=(type:number,source:string)=>{
        const shader=gl.createShader(type)!;gl.shaderSource(shader,source);gl.compileShader(shader);
        if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS)){const error=gl.getShaderInfoLog(shader);gl.deleteShader(shader);throw new Error(error??'Particle shader failed');}
        return shader;
      };
      const vertex=compile(gl.VERTEX_SHADER,vertexSource),fragment=compile(gl.FRAGMENT_SHADER,fragmentSource);
      const program=gl.createProgram()!;gl.attachShader(program,vertex);gl.attachShader(program,fragment);gl.linkProgram(program);
      if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw new Error(gl.getProgramInfoLog(program)??'Particle program failed');
      gl.useProgram(program);
      const corners=[[0,-1.25,0],[1.08,.65,1],[-1.08,.65,2]];
      const data=new Float32Array(particles.length*3*15);
      let offset=0;
      particles.forEach(p=>corners.forEach(c=>{data.set([...p.target,...p.scatter,...p.color,p.seed,p.size,p.ambient,...c],offset);offset+=15;}));
      const buffer=gl.createBuffer()!;gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,data,gl.STATIC_DRAW);
      ['aTarget','aScatter','aColor','aMeta','aCorner'].forEach((name,i)=>{const location=gl.getAttribLocation(program,name);gl.enableVertexAttribArray(location);gl.vertexAttribPointer(location,3,gl.FLOAT,false,60,i*12);});
      const uniforms=Object.fromEntries(['uResolution','uPointer','uTime','uProgress','uIntro','uMobile'].map(name=>[name,gl.getUniformLocation(program,name)]));
      gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE);gl.clearColor(0,0,0,0);
      render=(time,intro)=>{
        if(contextLost)return;
        gl.viewport(0,0,canvas.width,canvas.height);gl.clear(gl.COLOR_BUFFER_BIT);
        gl.uniform2f(uniforms.uResolution,width,height);gl.uniform2f(uniforms.uPointer,pointer[0],pointer[1]);
        gl.uniform1f(uniforms.uTime,time);gl.uniform1f(uniforms.uProgress,progress.current);gl.uniform1f(uniforms.uIntro,intro);
        gl.uniform1f(uniforms.uMobile,width<700?1:0);gl.drawArrays(gl.TRIANGLES,0,particles.length*3);
      };
      dispose=()=>{gl.deleteBuffer(buffer);gl.deleteProgram(program);gl.deleteShader(vertex);gl.deleteShader(fragment);};
    }else{
      // Graceful Canvas fallback for browsers without WebGL.
      const ctx=canvas.getContext('2d');
      render=(time,intro)=>{
        if(!ctx)return;ctx.setTransform(canvas.width/width,0,0,canvas.height/height,0,0);ctx.clearRect(0,0,width,height);
        const p=progress.current,shift=Math.min(1,Math.max(0,(p-.16)/.3)),disperse=Math.min(1,Math.max(0,(p-.64)/.3)),assembly=intro*(1-disperse);
        const scale=Math.min(width*(width<700?.40:.245),height*.38);
        particles.filter((_,i)=>i%3===0).forEach(particle=>{
          const a=time*.105-.42,c=Math.cos(a),s=Math.sin(a),v=particle.target;
          const target=[v[0]*c+v[2]*s,v[1],v[2]*c-v[0]*s];
          const mix=assembly*(1-particle.ambient),x=target[0]*mix+particle.scatter[0]*(1-mix),y=target[1]*mix+particle.scatter[1]*(1-mix),z=target[2]*mix+particle.scatter[2]*(1-mix),depth=3.8/(3.8-z);
          const px=width*(width<700?.5:.735-.46*shift)+x*scale*depth,py=height*(width<700?.69:.47)+y*scale*depth,r=particle.size*depth;
          ctx.strokeStyle=`rgba(${particle.color.map(n=>Math.round(n*255)).join(',')},${.5+(z+1)*.16})`;ctx.beginPath();ctx.moveTo(px,py-r);ctx.lineTo(px+r,py+r*.6);ctx.lineTo(px-r,py+r*.6);ctx.closePath();ctx.stroke();
        });
      };
    }
    const motion=matchMedia('(prefers-reduced-motion: reduce)');
    let frame=0,last=0,elapsed=0,inView=true;
    const draw=(now:number)=>{
      const dt=last?Math.min((now-last)/1000,.05):0;last=now;
      if(!pausedRef.current&&!motion.matches)elapsed+=dt;
      pointer=pointer.map((v,i)=>v+(targetPointer[i]-v)*.045);
      const intro=motion.matches?1:Math.min(1,elapsed/2.4);
      render(motion.matches?0:elapsed,intro*intro*(3-2*intro));
      if(inView&&!document.hidden)frame=requestAnimationFrame(draw);
    };
    const start=()=>{cancelAnimationFrame(frame);last=0;if(inView&&!document.hidden)frame=requestAnimationFrame(draw);};
    const resize=new ResizeObserver(()=>{width=canvas.clientWidth;height=canvas.clientHeight;const dpr=Math.min(devicePixelRatio||1,1.75);canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);});resize.observe(canvas);
    const observer=new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;start();});observer.observe(canvas);
    const move=(e:PointerEvent)=>{const bounds=canvas.getBoundingClientRect();targetPointer=[((e.clientX-bounds.left)/width-.5)*2,((e.clientY-bounds.top)/height-.5)*2];};
    const leave=()=>{targetPointer=[0,0];};
    const lose=(event:Event)=>{event.preventDefault();contextLost=true;};
    const restore=()=>setRevision(value=>value+1);
    // Restore GPU resources if the browser recovers a lost graphics context.
    canvas.addEventListener('webglcontextlost',lose);canvas.addEventListener('webglcontextrestored',restore);
    window.addEventListener('pointermove',move,{passive:true});document.addEventListener('pointerleave',leave);
    document.addEventListener('visibilitychange',start);motion.addEventListener('change',start);
    return()=>{cancelAnimationFrame(frame);resize.disconnect();observer.disconnect();dispose();canvas.removeEventListener('webglcontextlost',lose);canvas.removeEventListener('webglcontextrestored',restore);window.removeEventListener('pointermove',move);document.removeEventListener('pointerleave',leave);document.removeEventListener('visibilitychange',start);motion.removeEventListener('change',start);};
  },[progress,revision]);
  return <canvas ref={ref} className="constellation" role="img" aria-label="A luminous three-dimensional brain made of thousands of triangles, assembling, rotating, and dispersing as you scroll"/>;
}



