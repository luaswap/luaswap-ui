import React from 'react';
import { Transition } from 'react-transition-group';
import  {transitions}  from './transitions';
import { getSafePercent } from '../utils';
import styles from '../styles.module.scss'


type TierStepProps = {
  accomplished: boolean,
  position: number,
  index: number,

  transition?: 'scale' | 'rotate' | 'skew',
  transitionDuration?: number,
};


const TierStep : React.FC<TierStepProps> = (props) => {
  const {
    accomplished,
    position,
    index,
    children,
    transition = null,
    transitionDuration = 300,
  } = props;
  

  const safePosition = getSafePercent(position);
  let style = {
    left: `${safePosition}%`,
    transitionDuration: `${transitionDuration}ms`,
  };
  return (
    <Transition in={accomplished} timeout={transitionDuration}>
      {(state) => {
        if (transition) {
     
          style = {
            ...style,
            ...transitions[transition][state],
          };
        }

        return (
          <div className={styles.RSPBstep} style={style}>
            {children}
{/*            
            {children({
              accomplished,
              position: safePosition,
              transitionState: state,
              index,
            })} */}
          </div>
        );
      }}
    </Transition>
  )
}
export default TierStep;