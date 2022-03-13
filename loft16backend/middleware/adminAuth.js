const jwt = require("jsonwebtoken");
const config = process.env;
const GAuthVerify = require("../helper/GAuthVerify");
const Admin = require("../models/Admin");

const snooze = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * <div
        id="messages"
        className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue h-64 max-h-80 scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
      >
        { conversation === [] && (
          <p className="text-gray-400 text-center py-8 text-xs">
            no conversation
          </p>
        )}

        

        <div>
          <div className="flex items-end justify-end">
            <div
              className="relative flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title={parseDateTime(new Date())}
            >
              <div className="cursor-default">
                <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-500 text-white ">
                  Tangina mo! Gago ka!
                </span>
              </div>
              <p
                className="absolute font-medium text-gray-500 -bottom-5"
                style={{ fontSize: "0.7rem" }}
              >
                You
              </p>
            </div>
            <img
              src={yourProfilePicture}
              alt="My profile"
              className="w-6 h-6 rounded-full order-2"
            />
          </div>
        </div>

        <div>
          <div className="flex items-end">
            <div
              className=" relative flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title={parseDateTime(new Date())}
            >
              <div className="cursor-default">
                <span className="px-4 py-2 cursor-none rounded-lg inline-block rounded-bl-none bg-gray-100 text-gray-600">
                  Tang Ina mo!
                </span>
              </div>
              <p
                className="absolute font-medium text-gray-500 -bottom-5"
                style={{ fontSize: "0.7rem" }}
              >
                Jervx<span className="">(Admin)</span>
              </p>
            </div>
            <img
              src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
              alt="My profile"
              className="w-6 h-6 rounded-full order-1"
            />
          </div>
        </div>
      </div>
 */

const verifyAdminToken = async (req, res, next) => {
  let token = req.cookies.admin_access_token;
  let client_id = req.cookies.client_id;
  let auth_iss = req.cookies.auth_iss;

  await snooze(1000)

  // console.log("--------COOKIES ADMIN AUTH CHECK----------\n", token+"\n---\n", client_id+"\n----\n", auth_iss)
  if (auth_iss)
    if (auth_iss === process.env.GIssuer) {
      try {
        const auth_user = await GAuthVerify(token, client_id);
      } catch (error) {
        return res.status(401).json({
          err: 401,
          description: "Your authorization has expired",
          solution: "Login to google again to gain Authorization",
        });
      }
    }

  if (!token)
    return res.status(403).json({
      err: 403,
      description: "Your sign in was expired",
      solution: "Please sign out & sign in again",
    });

  try {
    const adminData = jwt.verify(token, config.JWT_SCRT);
    const isAdmin = await Admin.findOne({ _id: adminData._id });

    if (!isAdmin)
      return res.status(403).json({
        err: 403,
        description: "Sorry, You Are Not Authorized!",
        solution: "We cannot find an admin under the credential you provided",
      });

    if (req.url.toLowerCase().includes("update")) {
      const updateActionCount = await Admin.updateOne(
        {
          _id: adminData._id,
        },
        {
          $inc: {
            action_count: 1,
          },
        }
      );
    }
  } catch (err) {
    return res.status(401).json({
      err: 401,
      description: "Your authorization has expired",
      solution: "Login again to gain Authorization",
    });
  }
  return next();
};

module.exports = verifyAdminToken;
