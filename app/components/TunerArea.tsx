import React from "react";
import cx from "classnames";
import { CheckMark } from "../lib/icons";
import { useTunerStore } from "../store/store";


export default function TunerArea() {
  const {closeValue, centsOff,order,selected,note, notes} = useTunerStore((state) => state);
  var _condition = Math.round(centsOff / 10);
  return (
    <div>
      {/* Tuner Div LG */}
      <div className="lg:w-[800px] hidden lg:flex items-center select-none justify-center relative bg-neutral-50 md:bg-white border md:border-neutral-200 border-neutral-50 overflow-hidden py-40 rounded-3xl ">
        <div className="w-24 h-full absolute left-0 bottom-0 bg-gradient-to-r !z-50 from-[#242424]/10 to-transparent"></div>

        {/* Left-Right Dark Shadows */}
        <div className="select-none pointer-events-none w-40 h-full absolute right-0 bottom-0 bg-gradient-to-l from-[#fff] to-transparent z-50 "></div>
        <div className="select-none pointer-events-none w-40 h-full absolute left-0 bottom-0 bg-gradient-to-r from-[#fff] to-transparent z-50 "></div>
        
        {/* Correct Tune Notification */}
        <div className="absolute bottom-8">
          <div
            className="flex gap-2 items-center">
              <div className={cx("text-neutral-500 background-white border border-neutral-100 p-2 rounded-lg shadow", {
                '!hidden': _condition == 0,
              })}>{_condition > 0 ? `+${_condition}` : `${_condition}`} </div>
              <div className="flex items-center justify-center text-neutral-700 background-white border border-neutral-100 p-2 rounded-lg shadow text-lg w-12 h-12">{note}</div>
              <div className={cx("text-neutral-500 background-white border border-neutral-100 p-2 rounded-lg shadow", {
                '!hidden': _condition == 0,
              })}>{_condition > 0 ? `Tune Up` : `Tune Down`} </div>
            {/* {_condition < 0 ? `${_condition} Tune Down` : ''}
            {_condition > 0 ? `+${_condition} Tune Up` : ''} */}
            <span className={cx('flex items-center gap-1 background-white border border-neutral-100 p-2 rounded-lg shadow text-lg',{
              'text-primary hidden': Math.round(centsOff / 10) != 0,
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

      {/* TUNER MOBİLE Div */}
      <div className="w-[400px] flex lg:hidden items-center select-none justify-center relative bg-neutral-50 md:bg-white border md:border-neutral-200 border-neutral-50 overflow-hidden py-40 rounded-3xl ">
        <div className="w-24 h-full absolute left-0 bottom-0 bg-gradient-to-r !z-50 from-[#242424]/10 to-transparent"></div>

        {/* Left-Right Dark Shadows */}
        <div className="select-none pointer-events-none w-40 h-full absolute right-0 bottom-0 bg-gradient-to-l from-[#fff] to-transparent z-50 "></div>
        <div className="select-none pointer-events-none w-40 h-full absolute left-0 bottom-0 bg-gradient-to-r from-[#fff] to-transparent z-50 "></div>
        
        {/* Correct Tune Notification */}
        <div className="absolute bottom-8">
          <div
            className="flex gap-2 items-center">
              <div className={cx("text-neutral-500 background-white border border-neutral-100 p-2 rounded-lg shadow", {
                '!hidden': _condition == 0,
              })}>{_condition > 0 ? `+${_condition}` : `${_condition}`} </div>
              <div className="flex items-center justify-center text-neutral-700 background-white border border-neutral-100 p-2 rounded-lg shadow text-lg w-12 h-12">{note}</div>
              <div className={cx("text-neutral-500 background-white border border-neutral-100 p-2 rounded-lg shadow", {
                '!hidden': _condition == 0,
              })}>{_condition > 0 ? `Tune Up` : `Tune Down`} </div>
            {/* {_condition < 0 ? `${_condition} Tune Down` : ''}
            {_condition > 0 ? `+${_condition} Tune Up` : ''} */}
            <span className={cx('flex items-center gap-1 background-white border border-neutral-100 p-2 rounded-lg shadow text-lg',{
              'text-primary hidden': Math.round(centsOff / 10) != 0,
            })}>Correct <CheckMark className="text-primary" /></span>
          </div>
        </div>

        {/* Middle Selector */}
        <div className="select-none pointer-events-none absolute bottom-1/3 left-1/2 w-2 rounded-full h-2 -translate-x-1/2 bg-primary"></div>
        <div
          className="select-none pointer-events-none absolute top-1/2 left-0 translate-y-2/3 ml-[500px] transition-all duration-1000"
          style={{
            left: `calc(-200px + (-100px * ${order + 1}))`,
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
