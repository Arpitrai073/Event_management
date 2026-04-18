import { Link } from 'react-router-dom';

const ChartLink = () => {
  return (
    <a 
      href="#" 
      className="bg-gray-100 text-blue-800 px-3 py-1 rounded hover:bg-gray-200 text-sm font-semibold"
      onClick={(e) => { e.preventDefault(); alert("Shows Flow Chart (Mocking per instructions)"); }}
    >
      CHART
    </a>
  );
};

export default ChartLink;
