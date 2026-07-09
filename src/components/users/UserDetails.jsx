import { useState } from "react";
import {
  X,
  KeyRound,
  UserX,
  Edit,
  CheckCircle2,
} from "lucide-react";

import StatusBadge from "../StatusBadge";


const tabs = [
  "Profile",
  "Roles & Access",
  "Activity",
  "Preferences",
];



function Field({ label, value }) {

  return (

    <div className="py-0.5">

      <p className="
        text-[10px]
        font-medium
        uppercase
        tracking-wide
        text-gray-400
      ">
        {label}
      </p>


      <div className="
        mt-1
        truncate
        text-[13px]
        text-gray-800
      ">
        {value || "-"}
      </div>


    </div>

  );

}




export default function UserDetails({
  user,
  onClose,
}) {


  const [tab,setTab] = useState("Profile");



  if(!user){
    return null;
  }



  const initials = user.name
    ?.split(" ")
    .map((n)=>n[0])
    .slice(0,2)
    .join("")
    .toUpperCase();




  return (

    <aside className="
      flex
      h-full
      min-h-0
      flex-col
      overflow-hidden
      rounded-xl
      border
      border-gray-200
      bg-white
      shadow-sm
    ">



      {/* HEADER */}

      <div className="
        flex
        shrink-0
        items-center
        justify-between
        border-b
        border-gray-200
        px-5
        py-2
      ">


        <h3 className="
          text-[13px]
          font-semibold
          text-gray-800
        ">
          User Details
        </h3>



        <button
          onClick={onClose}
          className="
            rounded
            p-1
            text-gray-500
            hover:bg-gray-100
          "
        >

          <X className="h-4 w-4"/>

        </button>


      </div>






      {/* PROFILE HEADER */}

      <div className="
        flex
        shrink-0
        items-center
        gap-3
        border-b
        border-gray-100
        px-5
        py-2
      ">



        <div className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-full
          bg-blue-600
          text-sm
          font-semibold
          text-white
        ">

          {initials}

        </div>





        <div className="min-w-0 flex-1">


          <div className="
            flex
            items-center
            gap-2
          ">


            <p className="
              truncate
              text-[13px]
              font-semibold
              text-gray-900
            ">
              {user.name} ({user.code})
            </p>




            <StatusBadge

              label={user.status}

              tone={
                user.status === "Active"
                ? "green"
                : "gray"
              }

              className="
                px-2
                py-0
                text-[9px]
              "

            />



          </div>





          <p className="
            truncate
            text-[11px]
            text-gray-600
          ">
            {user.email}
          </p>



        </div>


      </div>







      {/* TABS */}

      <div className="
        flex
        shrink-0
        border-b
        border-gray-200
        px-2
      ">


        {tabs.map((item)=>(

          <button

            key={item}

            onClick={()=>setTab(item)}

            className={`
              border-b-2
              px-3
              py-1
              text-[11px]
              font-medium

              ${
                tab===item
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500"
              }

            `}

          >

            {item}

          </button>


        ))}


      </div>







      {/* CONTENT */}

      <div className="
        flex-1
        overflow-auto
        px-5
        py-3
      ">



        {tab==="Profile" && (

          <div className="
            grid
            grid-cols-2
            gap-x-4
            gap-y-2
          ">


            <Field
              label="Employee Code"
              value={user.code}
            />


            <Field
              label="Date Of Joining"
              value={user.dateOfJoining}
            />


            <Field
              label="Department"
              value={user.department}
            />


            <Field
              label="Last Login"
              value={user.lastLogin}
            />


            <Field
              label="Job Title"
              value={user.jobTitle}
            />


            <Field
              label="Phone"
              value={user.phone}
            />



            <Field
              label="Location"
              value={user.location}
            />



            <Field
              label="Email Verified"
              value={
                <span className="
                  inline-flex
                  items-center
                  gap-1
                  text-green-600
                  text-[11px]
                ">

                  <CheckCircle2 className="h-3 w-3"/>

                  {
                    user.emailVerified
                    ? "Verified"
                    : "Not Verified"
                  }

                </span>
              }
            />



            <Field
              label="MFA Status"
              value={
                <span className="
                  inline-flex
                  items-center
                  gap-1
                  text-green-600
                  text-[11px]
                ">

                  <CheckCircle2 className="h-3 w-3"/>

                  {
                    user.mfaEnabled
                    ? "Enabled"
                    : "Disabled"
                  }

                </span>
              }
            />



          </div>


        )}



        {tab!=="Profile" && (

          <div className="
            py-10
            text-center
            text-[13px]
            text-gray-500
          ">

            {tab} details will appear here.

          </div>

        )}



      </div>







      {/* FOOTER */}

      <div className="
        grid
        shrink-0
        grid-cols-3
        gap-2
        border-t
        border-gray-200
        px-5
        py-2
      ">



        <button className="
          flex
          h-7
          items-center
          justify-center
          gap-1
          rounded-md
          border
          border-gray-200
          text-[11px]
        ">

          <KeyRound className="h-3 w-3"/>

          Reset Password

        </button>





        <button className="
          flex
          h-7
          items-center
          justify-center
          gap-1
          rounded-md
          border
          border-red-200
          text-[11px]
          text-red-600
        ">

          <UserX className="h-3 w-3"/>

          Deactivate

        </button>





        <button className="
          flex
          h-7
          items-center
          justify-center
          gap-1
          rounded-md
          bg-blue-600
          text-[11px]
          text-white
        ">

          <Edit className="h-3 w-3"/>

          Edit User

        </button>



      </div>



    </aside>

  );

}