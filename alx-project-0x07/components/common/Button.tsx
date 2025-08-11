//components/common/Button.tsx

import { ButtonProps } from "@/interface";



const Button = ({ buttonLabel, buttonSize, buttonBackgroundColor, action }: ButtonProps) => {

  const backgroundColorClass = buttonBackgroundColor ? {
    red: 'bg-red-500',
    blue: 'bg-blue-500',
    orange: 'bg-orange-500',
    green: 'bg-green-500',
  }[buttonBackgroundColor] : 'bg-slate-500'

  

  return (
    <button onClick={action} className={`${backgroundColorClass} ${buttonSize} px-6 py-2 text-sm font-semibold rounded-lg hover:${backgroundColorClass}/50 transition duration-300 text-white`}>
      {buttonLabel}
    </button>
  )



// const Button = ({ buttonLabel, buttonBackgroundColor, action, buttonSize = "medium" }: ButtonProps) => {
//   let sizeClass = "";
//   if (buttonSize === "small") sizeClass = "px-2 py-1 text-sm";
//   else if (buttonSize === "large") sizeClass = "px-6 py-3 text-lg";
//   else sizeClass = "px-4 py-2 text-base"; // default medium

//   return (
//     <button
//       onClick={action}
//       className={`bg-${buttonBackgroundColor}-500 hover:bg-${buttonBackgroundColor}-600 text-white font-bold rounded ${sizeClass}`}
//     >
//       {buttonLabel}
//     </button>
//   );

}

export default Button;