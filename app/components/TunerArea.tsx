import React from "react";
import cx from "classnames";
import { CheckMark } from "../lib/icons";

interface ITunerArea {
  order: number;
  centsOff: number;
  selected: number;
  notes: INote[];
}

interface INote {
  note: string;
  frequency: number;
}

export default function TunerArea({ order, centsOff, selected, notes }: ITunerArea) {
  const closeValue: number = 10;

  return (
    <div>
      {/* Tuner Div */}
      <div className="w-[800px] flex items-center select-none justify-center relative bg-[#ffffff] border border-[#e8e8e8] overflow-hidden mt-20 py-40 rounded-3xl ">
        <div className="w-24 h-full absolute left-0 bottom-0 bg-gradient-to-r !z-50 from-[#242424]/10 to-transparent"></div>

        {/* Left-Right Dark Shadows */}
        <div className="select-none pointer-events-none w-40 h-full absolute right-0 bottom-0 bg-gradient-to-l from-[#fff] to-transparent z-50 "></div>
        <div className="select-none pointer-events-none w-40 h-full absolute left-0 bottom-0 bg-gradient-to-r from-[#fff] to-transparent z-50 "></div>
        
        {/* Correct Tune Notification */}
        <div className="absolute bottom-8">
          <div
            className="text-neutral-700 background-white border border-neutral-100 p-2 rounded-lg shadow">
            {Math.round(centsOff / 10) < 0 ? `${Math.round(centsOff / 10)} Incrase Tone` : ''}
            {Math.round(centsOff / 10) > 0 ? `+${Math.round(centsOff / 10)} Decrase Tone` : ''}
            <span className={cx('hidden items-center gap-1',{
              'text-primary flex': Math.round(centsOff / 10) == 0,
            })}>Correct <CheckMark className="text-primary" /></span>
          </div>
        </div>

        {/* Middle Selector */}
        <div className="select-none pointer-events-none absolute bottom-1/3 left-1/2 w-2 rounded-full h-2 -translate-x-1/2 bg-primary"></div>
        <div
          className="select-none pointer-events-none absolute top-1/2 left-0 translate-y-2/3 ml-[500px] transition-all duration-1000"
          style={{
            left: `calc(-100px * ${order + 1})`,
            transform: `translateX(${-10 * Math.round(centsOff / 10)}px)`,
          }}>
          <div className="select-none pointer-events-none flex items-end gap-2">
            {[...Array(481)].map((n, i) => {
              return (
                <div
                  key={i}
                  className={cx("w-[2px] h-2", {
                    "bg-neutral-400": i % 10 != 0,
                    "!h-4 relative bg-neutral-400": i % 10 == 0,
                    "!bg-primary": i % 10 == 0 && i == selected && Math.abs(centsOff) < closeValue,
                  })}>
                  <div
                    className={cx(
                      "absolute select-none pointer-events-none overflow-hidden text-neutral-600 font-medium bottom-8 transition-all duration-1000 text-center -left-0 -translate-x-1/2",
                      {
                        "!hidden": i % 10 != 0,
                        "!text-primary": i % 10 == 0 && i == selected && Math.abs(centsOff) < closeValue,
                      }
                    )}>
                    {(i + 1) % 10 == 1 ? notes[i / 10]?.note : ""}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
