import React from 'react'

// import { Step } from '../step';
import { getSafePercent, getStepPosition } from '../utils';
import styles from '../styles.module.scss'


interface ProgressBarProps {
  percent: number,
  stepPositions?: Array<number>,
  unfilledBackground?: string,
  filledBackground?: string,
  width?: number,
  height?: number,
  hasStepZero?: boolean,
  text?: string,
}


const ProgressBar: React.FC<ProgressBarProps> = (props) => {


  const {
    percent,
    children,
    stepPositions = [],
    unfilledBackground = null,
    filledBackground = null,
    width = null,
    height = null,
    hasStepZero = true,
    text = null,
  } = props;
  const safePercent = getSafePercent(percent);
  console.log(safePercent)

  return (

    <div className={styles.RSPBprogressBar} style={{ background: unfilledBackground, width, height }}>
      {
        /* {children} */
        React.Children.map(children, (step: any, index: number) => {
          const position = stepPositions.length > 0
            ? stepPositions[index]
            : getStepPosition(React.Children.count(children), index, hasStepZero);
            return React.cloneElement(step, {
              accomplished: position <= safePercent,
              position,
              index,
            });

        })
      }
      
      <div
        className={styles.RSPBprogression}
        style={{
          background: filledBackground,
          width: `${safePercent}%`,
        }}
      />
    </div>
  )
}
export default ProgressBar;