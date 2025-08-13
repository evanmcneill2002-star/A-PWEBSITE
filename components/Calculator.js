import { useState } from "react";

export default function Calculator() {
  const [display, setDisplay] = useState("0");
  const [operand, setOperand] = useState(null);
  const [operator, setOperator] = useState(null);

  const handleDigit = (d) => {
    setDisplay((prev) => (prev === "0" ? String(d) : prev + d));
  };
  const handleOp = (op) => {
    setOperand(Number(display));
    setOperator(op);
    setDisplay("");
  };
  const handleEquals = () => {
    if (operator && operand !== null) {
      const b = Number(display || "0");
      let r = 0;
      switch (operator) {
        case "+": r = operand + b; break;
        case "-": r = operand - b; break;
        case "*": r = operand * b; break;
        case "/": r = b !== 0 ? operand / b : "Err"; break;
        default: return;
      }
      setDisplay(String(r));
      setOperand(null);
      setOperator(null);
    }
  };
  const handleClear = () => {
    setDisplay("0");
    setOperand(null);
    setOperator(null);
  };

  const Btn = ({ children, onClick, className="" }) => (
    <button onClick={onClick} className={`py-2 rounded ${className}`}>{children}</button>
  );

  return (
    <div className="w-64 bg-gray-800 text-white rounded p-4">
      <div className="bg-black text-right px-2 py-2 mb-2 rounded font-mono">{display}</div>
      <div className="grid grid-cols-4 gap-2">
        <Btn onClick={handleClear} className="col-span-2 bg-gray-500">C</Btn>
        <Btn onClick={() => handleOp("/")} className="bg-blue-600">÷</Btn>
        <Btn onClick={() => handleOp("*")} className="bg-blue-600">×</Btn>

        {[7,8,9].map(n => <Btn key={n} onClick={() => handleDigit(n)} className="bg-gray-700">{n}</Btn>)}
        <Btn onClick={() => handleOp("-")} className="bg-blue-600">-</Btn>

        {[4,5,6].map(n => <Btn key={n} onClick={() => handleDigit(n)} className="bg-gray-700">{n}</Btn>)}
        <Btn onClick={() => handleOp("+")} className="bg-blue-600">+</Btn>

        {[1,2,3].map(n => <Btn key={n} onClick={() => handleDigit(n)} className="bg-gray-700">{n}</Btn>)}
        <Btn onClick={handleEquals} className="row-span-2 bg-green-600">=</Btn>
        <Btn onClick={() => handleDigit(0)} className="col-span-2 bg-gray-700">0</Btn>
        <Btn onClick={() => handleDigit(".")} className="bg-gray-700">.</Btn>
      </div>
    </div>
  );
}
