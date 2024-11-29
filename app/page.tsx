"use client";
import React from "react";
import { useEffect, useState } from "react";
import Pitchfinder from "pitchfinder";
import NextImage from 'next/image';
import TunerArea from "./components/TunerArea";
import {motion} from 'framer-motion';

export default function Home() {
  const [note, setNote] = useState<string | null>(null); // Tespit edilen nota
  const [frequency, setFrequency] = useState<number | null | string>(null); // Tespit edilen frekans
  const [centsOff, setCentsOff] = useState<number>(0); // Notanın ne kadar doğru çalındığını gösteren fark
  const [order, setOrder] = useState<number>(0);
  const [selected, setSelected] = useState<number>(0);
  const notes = [
    { note: "C", frequency: 65.41 },
    { note: "C#", frequency: 69.3 },
    { note: "D", frequency: 73.42 },
    { note: "D#", frequency: 77.78 },
    { note: "E", frequency: 82.41 },
    { note: "F", frequency: 87.31 },
    { note: "F#", frequency: 92.5 },
    { note: "G", frequency: 98.0 }, 
    { note: "G#", frequency: 103.83 },
    { note: "A", frequency: 110.0 },
    { note: "A#", frequency: 116.54 },
    { note: "B", frequency: 123.47 },
    { note: "C", frequency: 130.81 },
    { note: "C#", frequency: 138.59 },
    { note: "D", frequency: 146.83 },
    { note: "D#", frequency: 155.56 },
    { note: "E", frequency: 164.81 },
    { note: "F", frequency: 174.61 },
    { note: "F#", frequency: 185.0 },
    { note: "G", frequency: 196.0 },
    { note: "G#", frequency: 207.65 },
    { note: "A", frequency: 220.0 },
    { note: "A#", frequency: 233.08 },
    { note: "B", frequency: 246.94 },
    { note: "C", frequency: 261.63 },
    { note: "C#", frequency: 277.18 },
    { note: "D", frequency: 293.66 },
    { note: "D#", frequency: 311.13 },
    { note: "E", frequency: 329.63 },
    { note: "F", frequency: 349.23 },
    { note: "F#", frequency: 369.99 },
    { note: "G", frequency: 392.0 },
    { note: "G#", frequency: 415.3 },
    { note: "A", frequency: 440.0 },
    { note: "A#", frequency: 466.16 },
    { note: "B", frequency: 493.88 },
    { note: "C", frequency: 523.25 },
    { note: "C#", frequency: 554.37 },
    { note: "D", frequency: 587.33 },
    { note: "D#", frequency: 622.25 },
    { note: "E", frequency: 659.25 },
    { note: "F", frequency: 698.46 },
    { note: "F#", frequency: 739.99 },
    { note: "G", frequency: 783.99 },
    { note: "G#", frequency: 830.61 },
    { note: "A", frequency: 880.0 },
    { note: "A#", frequency: 932.33 },
    { note: "B", frequency: 987.77 },
    { note: "C", frequency: 1046.5 },
  ];

  useEffect(() => {
    // Kullanıcıdan mikrofon izni isteme ve sesi yakalama
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const audioContext = new window.AudioContext();
        const analyser = audioContext.createAnalyser();
        const microphone = audioContext.createMediaStreamSource(stream);
        const scriptProcessor = audioContext.createScriptProcessor(4096, 1, 1);

        const lowPassFilter = audioContext.createBiquadFilter();
        lowPassFilter.type = 'lowpass';
        lowPassFilter.frequency.value = 1000; // 1000 Hz altı frekanslar geçecek
        microphone.connect(lowPassFilter);
        lowPassFilter.connect(analyser);

        const highPassFilter = audioContext.createBiquadFilter();
        highPassFilter.type = 'highpass';
        highPassFilter.frequency.value = 55; // 50 Hz'in altındaki gürültüleri filtreleyin
        microphone.connect(highPassFilter);
        highPassFilter.connect(analyser);


        analyser.fftSize = 4096;
        microphone.connect(analyser);
        analyser.connect(scriptProcessor);
        scriptProcessor.connect(audioContext.destination);

        const detectPitch = Pitchfinder.YIN({
          sampleRate: audioContext.sampleRate,
          threshold: 0.15,   // Eşik değeri
        }); // Sample rate kullanarak YIN alg. oluştur

        scriptProcessor.onaudioprocess = function (event) {
          const audioData = event.inputBuffer.getChannelData(0); // Tek kanal ses verisi
          const detectedPitch = detectPitch(audioData); // Frekansı tespit et

          // Frekans tespiti yapıldıysa ve 1000 Hz'in altındaysa işlemleri yap
          if (detectedPitch && detectedPitch <= 1000) {
            setFrequency(detectedPitch); // Frekansı ayarla
            const closestNote = getNoteFromFrequency(detectedPitch); // Nota tespiti ve ayarlama
            setNote(closestNote.note);
            setCentsOff(+closestNote.cents); // Cents farkını ayarla
            setOrder(closestNote.order);
            setSelected(closestNote.order * 10 + Math.round(centsOff / 10));
          }
        };
      })
      .catch((err) => console.log("Mikrofon erişim hatası:", err));
  }, []);

  // Frekansa göre nota ismini ve cent farkını bulma fonksiyonu
  function getNoteFromFrequency(frequency: number) {
    // En yakın notayı ve cent farkını bul
    let closestNote = notes[0];
    let minDiff = Math.abs(frequency - notes[0].frequency);
    let centDiff = 0;

    for (let i = 1; i < notes.length; i++) {
      const diff = Math.abs(frequency - notes[i].frequency);
      if (diff < minDiff) {
        closestNote = notes[i];
        minDiff = diff;
      }
    }

    // Cent farkını hesapla
    centDiff = 1200 * Math.log2(frequency / closestNote.frequency);

    return { note: closestNote.note, cents: centDiff.toFixed(2), order: notes.indexOf(closestNote) };
  }

  return (
    <div className="w-full min-h-screen bg-[#fafafa] flex items-center lg:py-32 md:py-16 sm:py-8 flex-col select-none">
      <div className="flex flex-col gap-4 items-center">
        <motion.h1 initial={{x: -5, opacity: 0}} animate={{opacity: 1, x:0, transition: { duration: .25}}}  className="flex gap-4 items-center text-neutral-900 justify-center text-3xl lg:text-5xl font-bold tracking-tighter "><div className="lg:w-16 lg:h-16 w-12 h-12 relative"><NextImage alt="Tuner App Logo" src="/tunerLogo.png" className="lg:w-16 lg:h-16 w-12 h-12" fill quality={100} priority /></div>Tuner</motion.h1>
        <motion.p initial={{x: -10, opacity: 0}} animate={{opacity: 1, x:0, transition: { duration: .25, delay: 0.2}}} className="text-xl lg:text-2xl text-neutral-900">Online Chromatic Tuner.</motion.p>
      </div>
      <motion.div initial={{x: -15, opacity: 0}} animate={{opacity: 1, x:0, transition: { duration: .7, delay: 0.6}}} className="mt-12">
        <TunerArea order={order} centsOff={centsOff} selected={selected} notes={notes} />     
      </motion.div>
      <div className="text-[#8A8A8A] mt-12 text-center gap-2">

      <span>2024 © Made by <a className="text-neutral-600 transition hover:text-neutral-900" href="https://x.com/astrodokki">Emir</a>. <br /> <span>All rights reserved.</span> </span>

      </div>
    </div>
  );
}