/* eslint-disable react/prop-types */
export default function Button({children, onClick}){
    return   <button className="btn-toggle" onClick={onClick}>
   {children}
  </button>
}