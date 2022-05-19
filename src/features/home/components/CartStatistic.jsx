import React from 'react';
import CountUp from 'react-countup';
const CartStatistic = ({ total, title, icon }) => {
    return (
        <div className="cursor-pointer p-2 3xl:w-1/4 2xl:w-1/4 xl:w-1/3 lg:w-1/2 w-full">
            <div className="flex flex-col px-6 py-4 overflow-hidden bg-white hover:bg-gradient-to-br hover:from-purple-400 hover:via-blue-400 hover:to-blue-500 rounded-xl shadow-lg duration-300 hover:shadow-2xl group">
                <div className="flex flex-row justify-between items-center">
                    <div className="px-1 py-1 bg-gray-300  rounded-xl bg-opacity-30">
                        <img src={icon} alt="icon" />
                    </div>
                    <div className="inline-flex text-sm text-gray-600 group-hover:text-gray-200 sm:text-base">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 mr-2 text-green-500 group-hover:text-gray-200"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        12%
                    </div>
                </div>
                <h1 className="text-xl sm:text-lg xl:text-2xl font-bold text-gray-700 mt-3 group-hover:text-gray-50">
                    <CountUp separator=" " duration="1" end={total} />
                </h1>
                <div className="flex flex-row justify-between group-hover:text-gray-200">
                    <p>{title}</p>
                    <span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-indigo-600 group-hover:text-gray-200"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default CartStatistic;
