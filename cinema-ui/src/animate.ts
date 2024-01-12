// prefix
const animatePrefix = 'animate__animated ';
// Turn on random animation Random animation value
const animateList: string[] = [
  animatePrefix + 'animate__pulse',
  animatePrefix + 'animate__rubberBand',
  animatePrefix + 'animate__bounceIn',
  animatePrefix + 'animate__bounceInLeft',
  animatePrefix + 'animate__fadeIn',
  animatePrefix + 'animate__fadeInLeft',
  animatePrefix + 'animate__fadeInDown',
  animatePrefix + 'animate__fadeInUp',
  animatePrefix + 'animate__flipInX',
  animatePrefix + 'animate__lightSpeedInLeft',
  animatePrefix + 'animate__rotateInDownLeft',
  animatePrefix + 'animate__rollIn',
  animatePrefix + 'animate__rotateInDownLeft',
  animatePrefix + 'animate__zoomIn',
  animatePrefix + 'animate__zoomInDown',
  animatePrefix + 'animate__slideInLeft',
  animatePrefix + 'animate__lightSpeedIn'
];
// The default effect after turning off the random animation
const defaultAnimate = animatePrefix + 'animate__fadeIn';
// search hide show animation
const searchAnimate = {
  enter: '',
  leave: ''
};

// menu search animation
const menuSearchAnimate = {
  enter: animatePrefix + 'animate__fadeIn',
  leave: animatePrefix + 'animate__fadeOut'
};
// logo animation
const logoAnimate = {
  enter: animatePrefix + 'animate__fadeIn',
  leave: animatePrefix + 'animate__fadeOut'
};

export default {
  animateList,
  defaultAnimate,
  searchAnimate,
  menuSearchAnimate,
  logoAnimate
};
