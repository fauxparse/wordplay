import { Box, useColorModeValue } from '@chakra-ui/react';
import { loadBasic } from '@tsparticles/basic';
import { loadTrailEffect } from '@tsparticles/effect-trail';
import { type ISourceOptions } from '@tsparticles/engine';
import { loadEmittersPlugin } from '@tsparticles/plugin-emitters';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadDestroyUpdater } from '@tsparticles/updater-destroy';
import { loadLifeUpdater } from '@tsparticles/updater-life';
import { loadRotateUpdater } from '@tsparticles/updater-rotate';
import { useMemo } from 'react';
import { useSettings } from '../../SettingsProvider';
import { neutral, neutralDark } from '../../theme';

export const initializeFireworks = () =>
  initParticlesEngine(async (engine) => {
    await loadBasic(engine);
    await loadTrailEffect(engine);
    await loadEmittersPlugin(engine);
    await loadLifeUpdater(engine);
    await loadRotateUpdater(engine);
    await loadDestroyUpdater(engine);
  });

type FireworksProps = {
  color: string;
};

const Fireworks: React.FC<FireworksProps> = ({ color }) => {
  const { blackAndWhite } = useSettings();

  const black = useColorModeValue(neutral.neutral9, neutralDark.neutral9);
  const fireworksColor = blackAndWhite ? black : color;

  const options: ISourceOptions = useMemo(
    () => ({
      name: 'Fireworks 2',
      emitters: {
        direction: 'top',
        life: {
          count: 0,
          duration: 0.1,
          delay: 0.1,
        },
        rate: {
          delay: 0.15,
          quantity: 1,
        },
        size: {
          width: 100,
          height: 0,
        },
        position: {
          y: 100,
          x: 50,
        },
      },
      particles: {
        color: {
          value: fireworksColor,
        },
        number: {
          value: 0,
        },
        opacity: {
          value: 0.5,
        },
        destroy: {
          bounds: {
            top: 30,
          },
          mode: 'split',
          split: {
            count: 1,
            factor: {
              value: 0.333333,
            },
            rate: {
              value: 100,
            },
            particles: {
              stroke: {
                width: 0,
              },
              color: {
                value: [fireworksColor],
              },
              number: {
                value: 0,
              },
              collisions: {
                enable: false,
              },
              destroy: {
                bounds: {
                  top: 0,
                },
              },
              opacity: {
                value: {
                  min: 0.1,
                  max: 0.8,
                },
                animation: {
                  enable: true,
                  speed: 0.7,
                  sync: false,
                  startValue: 'max',
                  destroy: 'min',
                },
              },
              effect: {
                type: 'trail',
                options: {
                  trail: {
                    length: {
                      min: 2,
                      max: 5,
                    },
                  },
                },
              },
              shape: {
                type: 'circle',
              },
              size: {
                value: {
                  max: 5,
                  min: 0,
                },
                animation: {
                  enable: true,
                  startValue: 'max',
                  destroy: 'min',
                },
              },
              life: {
                count: 1,
                duration: {
                  value: {
                    min: 1,
                    max: 2,
                  },
                },
              },
              move: {
                enable: true,
                gravity: {
                  enable: true,
                  acceleration: 9.81,
                  inverse: false,
                },
                decay: 0.1,
                speed: {
                  min: 10,
                  max: 25,
                },
                direction: 'outside',
                outModes: 'destroy',
              },
            },
          },
        },
        life: {
          count: 1,
        },
        rotate: {
          path: true,
        },
        shape: {
          type: 'circle',
        },
        size: {
          value: 1,
        },
        move: {
          enable: true,
          gravity: {
            acceleration: 15,
            enable: true,
            inverse: true,
            maxSpeed: 100,
          },
          speed: {
            min: 10,
            max: 20,
          },
          outModes: {
            default: 'destroy',
            top: 'none',
          },
        },
      },
    }),
    [fireworksColor],
  );

  const blendMode = useColorModeValue('multiply', 'screen');

  return (
    <Box
      pos="fixed"
      inset={0}
      zIndex={100}
      pointerEvents="none"
      mixBlendMode={blendMode}
    >
      <Particles id="tsparticles" options={options} />
    </Box>
  );
};

export default Fireworks;
