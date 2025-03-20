"use client";
import React from "react";
import { useEffect, useState } from "react";
import Pitchfinder from "pitchfinder";
import NextImage from 'next/image';
import TunerArea from "./components/TunerArea";
import {motion} from 'framer-motion';
import { GitHub } from "./lib/icons";
import { useTunerStore } from "./store/store";

export default function Home() {
  const {centsOff, updateStore, notes} = useTunerStore((state) => state);



  useEffect(() => {
    const setupAudio = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const audioContext = new window.AudioContext();
        const analyser = audioContext.createAnalyser();
        const microphone = audioContext.createMediaStreamSource(stream);
        const scriptProcessor = audioContext.createScriptProcessor(4096, 1, 1);
  
        const lowPassFilter = audioContext.createBiquadFilter();
        lowPassFilter.type = 'lowpass';
        lowPassFilter.frequency.value = 1000;
        microphone.connect(lowPassFilter);
        lowPassFilter.connect(analyser);
  
        const highPassFilter = audioContext.createBiquadFilter();
        highPassFilter.type = 'highpass';
        highPassFilter.frequency.value = 55;
        microphone.connect(highPassFilter);
        highPassFilter.connect(analyser);
  
        analyser.fftSize = 2048;
        analyser.connect(scriptProcessor);
        scriptProcessor.connect(audioContext.destination);
  
        const detectPitch = Pitchfinder.YIN({
          sampleRate: audioContext.sampleRate,
          threshold: 0.15,
        });
  
        scriptProcessor.onaudioprocess = (event) => {
          const audioData = event.inputBuffer.getChannelData(0);
          const detectedPitch = detectPitch(audioData);
  
          if (detectedPitch && detectedPitch <= 1000) {
            const closestNote = getNoteFromFrequency(detectedPitch);
            updateStore({
              frequency: detectedPitch,
              note: closestNote.note,
              centsOff: +closestNote.cents,
              order: closestNote.order,
              selected: closestNote.order * 10 + Math.round(+closestNote.cents / 10),
            });
          }
        };
      } catch (err) {
        console.error("Mikrofon erişim hatası:", err);
      }
    };
  
    setupAudio();
  }, []);

  // Frekansa göre nota ismini ve cent farkını bulma fonksiyonu
  function getNoteFromFrequency(frequency: number) {
    let closestNote = notes[0];
    let minDiff = Math.abs(frequency - notes[0].frequency);
  
    for (let i = 1; i < notes.length; i++) {
      const diff = Math.abs(frequency - notes[i].frequency);
      if (diff < minDiff) {
        closestNote = notes[i];
        minDiff = diff;
      }
    }
  
    const centDiff = 1200 * Math.log2(frequency / closestNote.frequency);
    return { note: closestNote.note, cents: centDiff.toFixed(2), order: notes.indexOf(closestNote) };
  }

  return (
    <div className="w-full min-h-screen overflow-hidden bg-neutral-50 flex items-center lg:py-32 md:py-16 py-8 flex-col select-none">
      <div className="flex flex-col gap-4 items-center">
        <motion.h1 initial={{x: -5, opacity: 0}} animate={{opacity: 1, x:0, transition: { duration: .25}}}  className="flex gap-4 items-center text-neutral-900 justify-center text-3xl lg:text-5xl font-bold tracking-tighter "><div className="lg:w-16 lg:h-16 w-12 h-12 relative"><NextImage alt="Tuner App Logo" src="/tunerLogo.png" className="lg:w-16 lg:h-16 w-12 h-12" fill quality={100} priority /></div>Tuner</motion.h1>
        <motion.p initial={{x: -10, opacity: 0}} animate={{opacity: 1, x:0, transition: { duration: .25, delay: 0.2}}} className="text-xl lg:text-2xl text-neutral-900">Online Chromatic Tuner.</motion.p>
      </div>
      <motion.div initial={{x: -15, opacity: 0}} animate={{opacity: 1, x:0, transition: { duration: .7, delay: 0.6}}} className="mt-8 md:mt-12 overflow-hidden">
        <TunerArea />     
      </motion.div>
      <div className="text-[#8A8A8A] mt-12 text-center gap-2">

      <span>2025 © Made by <a className="text-neutral-600 transition hover:text-neutral-900" href="https://x.com/astrodokki">Emir</a>. <br /> <span>All rights reserved.</span> </span>
      <div className="flex items-center justify-center mt-4 "><a className="" href="https://github.com/emirulucay/tuner-app"><GitHub className="text-neutral-600 hover:text-neutral-900 transition" /></a>  </div>
      </div>
    </div>
  );
}