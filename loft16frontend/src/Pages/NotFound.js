import React from "react";
import { withRouter } from 'react-router-dom'
import { Button } from '@windmill/react-ui'

const NotFound = (props) => {
  return (
    <div className="h-screen w-screen bg-gray-100 flex flex-center items-center">
      <div className="m-auto text-center">
        <img alt='saly' src="https://cdn.discordapp.com/attachments/912411399458795593/920991183994507274/Saly-17.png"/>
        <p className="text-7xl defText-Col-2">404 </p>
        <p className="mt-2 defText-Col-2 font-medium">Sorry! But you went </p>
        <p className="mt-2 defText-Col-2">Looks Like We Don't Have That Page </p>
        <Button className="mt-7 rounded-xl defBackground hover:bg-green-500" onClick={()=>{props.history.push("/")}}>
            Go Back
        </Button>
      </div>
    </div>
  );
};

export default withRouter(NotFound);
