import React, {useState, useEffect} from "react";
import {Row,Col} from "react-bootstrap";
import {Slider, Rail, Handles, Ticks} from "react-compound-slider";
import {SliderRail, Handle, Tick} from "./SliderComponent";
import {startOfToday, addDays, format} from "date-fns";
import {scaleTime} from "d3-scale";

const sliderStyle = {
  position: "relative",
  width: "100%"
};

function formatTick(ms) {
  return format(new Date(ms), "MMM dd");
}

const constantDay = new Date("2019-12-8");
const today = startOfToday();
const min = constantDay;
const max = today;

const SliderBar = ({slideSlider,addSelectedDay }) => {
    const [values,setValues] = useState(constantDay);
    const [selectedDay,setSelectedDay] = useState(constantDay); 
    const [play, setPlay] = useState(false);

    useEffect(() => {
        const timer =
        (play && values.getTime() <= today.getTime()) && setInterval(() => {
            setValues(values=>addDays(values,1));
            setSelectedDay(selectedDay => addDays(selectedDay,1));   
            addSelectedDay();   
        }, 1000);
        return () => clearInterval(timer);
      },[values,play])
    

    const onChange = ([ms]) => {
        let date = new Date(ms);
        setSelectedDay(date); 
        setValues(date); 
        slideSlider([ms]); 
    };

    const dateTicks = scaleTime()
    .domain([min, max])
    .ticks(8)
    .map(d => +d);

    return <div>
        <Row style={{ margin: "5%", height: 100, width: "100%" }}>
            <Col xs={8} >{values && format(values, "MMM dd yyyy")}</Col>
            <Col>
                <button onClick = {() => {setPlay(true)}}>
                  Play
                </button>
                <button onClick = {() => {setPlay(false)}}>
                  Pause
                </button>
            </Col>
        </Row>
        <div>
          <Slider
            mode={1}
            step={86400000}
            domain={[+min, +max]}
            rootStyle={sliderStyle}
            onChange={onChange}
            values={[+values]}
          >
            <Rail>
              {({ getRailProps }) => <SliderRail getRailProps={getRailProps} />}
            </Rail>
            <Handles>
              {({ handles, getHandleProps }) => (
                <div>
                  {handles.map(handle => (
                    <Handle
                      key={handle.id}
                      handle={handle}
                      domain={[+min, +max]}
                      getHandleProps={getHandleProps}
                    />
                  ))}
                </div>
              )}
            </Handles>

            <Ticks values={dateTicks}>
              {({ ticks }) => (
                <div>
                  {ticks.map(tick => (
                    <Tick
                      key={tick.id}
                      tick={tick}
                      count={ticks.length}
                      format={formatTick}
                    />
                  ))}
                </div>
              )}
            </Ticks>
          </Slider>
        </div>
    </div>
}
export default SliderBar