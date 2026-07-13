// import { useState, useEffect } from "react";
// import { X, FolderPlus } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import toast from "react-hot-toast";

// export default function MasterDataModal({
//   open,
//   onClose,
//   onSuccess,

//   title,
//   editData,

//   idField,
//   codeField,
//   nameField,

//   codeLabel,
//   nameLabel,

//   addApi,
//   updateApi,
// }) {
//   const isEdit = !!editData;

//   const [formData, setFormData] = useState({
//     [codeField]: "",
//     [nameField]: "",
//     active: true,
//   });

//   const [saving, setSaving] = useState(false);

//   useEffect(() => {
//     if (!open) return;

//     if (editData) {
//       setFormData({
//         [codeField]: editData[codeField] || "",
//         [nameField]: editData[nameField] || "",
//         active: editData.active ?? true,
//       });
//     } else {
//       setFormData({
//         [codeField]: "",
//         [nameField]: "",
//         active: true,
//       });
//     }
//   }, [open, editData, codeField, nameField]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const validate = () => {
//     const errors = [];

//     if (!formData[codeField]?.trim()) {
//       errors.push(`${codeLabel} is required`);
//     }

//     if (!formData[nameField]?.trim()) {
//       errors.push(`${nameLabel} is required`);
//     }

//     if (errors.length > 0) {
//       errors.forEach((err) => toast.error(err));
//       return false;
//     }

//     return true;
//   };

//   const isFormValid = () => {
//     return (
//       formData[codeField]?.trim() &&
//       formData[nameField]?.trim()
//     );
//   };

//   const handleUpdate = async () => {
//     try {
//       setSaving(true);

//       const payload = {
//         [codeField]: formData[codeField],
//         [nameField]: formData[nameField],
//         active: formData.active,
//       };

//       if (isEdit) {
//         await updateApi(editData[idField], payload);

//         toast.success(`${title} updated successfully`);
//       } else {
//         await addApi(payload);

//         toast.success(`${title} created successfully`);
//       }

//       onSuccess?.();
//       onClose?.();
//     } catch (error) {
//       console.error(error);
//       toast.error(`Unable to save ${title}`);
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleSave = () => {
//     if (!validate()) return;

//     handleUpdate();
//   };

//   if (!open) return null;
//     return (
//     <AnimatePresence>
//       <motion.div
//         className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//       >
//         <motion.div
//           initial={{
//             opacity: 0,
//             scale: 0.96,
//             y: 20,
//           }}
//           animate={{
//             opacity: 1,
//             scale: 1,
//             y: 0,
//           }}
//           exit={{
//             opacity: 0,
//             scale: 0.96,
//             y: 20,
//           }}
//           transition={{ duration: 0.25 }}
//           className="w-full max-w-2xl overflow-hidden rounded-xl bg-white shadow-2xl"
//         >
//           {/* Header */}
//           <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-6 py-4">
//             <div className="flex items-center gap-3">

//               <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
//                 <FolderPlus size={22} />
//               </div>

//               <div>
//                 <h2 className="text-lg font-semibold text-gray-900">
//                   {isEdit
//                     ? `Edit ${title}`
//                     : `Add ${title}`}
//                 </h2>

//                 <p className="text-sm text-gray-500">
//                   {isEdit
//                     ? `Update ${title.toLowerCase()} information`
//                     : `Create a new ${title.toLowerCase()}`}
//                 </p>
//               </div>

//             </div>

//             <button
//               onClick={onClose}
//               className="rounded-lg p-2 hover:bg-gray-100"
//             >
//               <X size={20} />
//             </button>
//           </div>

//           {/* Body */}

//           <div className="p-6">
//             <div className="grid grid-cols-1 gap-5">

//               {/* Code */}

//               <div>
//                 <label className="mb-2 block text-sm font-medium text-gray-700">
//                   {codeLabel}
//                   <span className="text-red-600">
//                     {" "}
//                     *
//                   </span>
//                 </label>

//                 <input
//                   type="text"
//                   name={codeField}
//                   value={formData[codeField]}
//                   onChange={handleChange}
//                   placeholder={`Enter ${codeLabel}`}
//                   className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>

//               {/* Name */}

//               <div>
//                 <label className="mb-2 block text-sm font-medium text-gray-700">
//                   {nameLabel}
//                   <span className="text-red-600">
//                     {" "}
//                     *
//                   </span>
//                 </label>

//                 <input
//                   type="text"
//                   name={nameField}
//                   value={formData[nameField]}
//                   onChange={handleChange}
//                   placeholder={`Enter ${nameLabel}`}
//                   className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>

//               {/* Status */}

//               <div>
//                 <label className="mb-2 block text-sm font-medium text-gray-700">
//                   Active Status
//                 </label>

//                 <div className="flex gap-8">

//                   <label className="flex items-center gap-2">
//                     <input
//                       type="radio"
//                       checked={formData.active === true}
//                       onChange={() =>
//                         setFormData({
//                           ...formData,
//                           active: true,
//                         })
//                       }
//                     />

//                     <span>Active</span>
//                   </label>

//                   <label className="flex items-center gap-2">
//                     <input
//                       type="radio"
//                       checked={formData.active === false}
//                       onChange={() =>
//                         setFormData({
//                           ...formData,
//                           active: false,
//                         })
//                       }
//                     />

//                     <span>Inactive</span>
//                   </label>

//                 </div>
//               </div>

//             </div>
//           </div>

//           {/* Footer */}

//           <div className="flex justify-end gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4">

//             <button
//               onClick={onClose}
//               className="rounded-lg border border-gray-300 px-5 py-2 text-sm font-medium hover:bg-gray-100"
//             >
//               Cancel
//             </button>

//             <button
//               onClick={handleSave}
//               disabled={saving || !isFormValid()}
//               className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:bg-gray-400"
//             >
//               {saving
//                 ? isEdit
//                   ? "Updating..."
//                   : "Saving..."
//                 : isEdit
//                 ? `Update ${title}`
//                 : `Save ${title}`}
//             </button>

//           </div>

//         </motion.div>
//       </motion.div>
//     </AnimatePresence>
//   );
// }

import { useState, useEffect } from "react";
import { X, FolderPlus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

export default function MasterDataModal({

  open,
  onClose,
  onSuccess,

  title,
  editData,

  idField,
  codeField,
  nameField,

  codeLabel,
  nameLabel,

  addApi,
  updateApi,

  // NEW: Dynamic extra fields
  extraFields = [],
  compactLayout = false,  // layout changing in businessunits


}) {

  const isEdit = !!editData;


  const [formData, setFormData] = useState({
    [codeField]: "",
    [nameField]: "",
    active: true,
  });


  const [saving, setSaving] = useState(false);



  /* ---------------- LOAD DATA ---------------- */

  useEffect(() => {

    if (!open) return;


    let initialData = {

      [codeField]: "",
      [nameField]: "",
      active: true,

    };


    if (editData) {

      initialData = {

        [codeField]:
          editData[codeField] || "",


        [nameField]:
          editData[nameField] || "",


        active:
          editData.active ?? true,

      };


      extraFields.forEach((field) => {

        initialData[field.name] =
          editData[field.name] ?? "";

      });


    }
    else {

      extraFields.forEach((field) => {

        initialData[field.name] = "";

      });

    }


    setFormData(initialData);


  }, [
    open,
    editData
  ]);




  /* ---------------- HANDLE CHANGE ---------------- */


  const handleChange = (e) => {

    const {
      name,
      value
    } = e.target;


    setFormData((prev) => ({

      ...prev,

      [name]: value

    }));

  };




  /* ---------------- VALIDATION ---------------- */


  const validate = () => {


    const errors = [];



    if (codeField &&
      !formData[codeField]?.trim()
    ) {

      errors.push(
        `${codeLabel} is required`
      );

    }



    if (
      !formData[nameField]?.trim()
    ) {

      errors.push(
        `${nameLabel} is required`
      );

    }



    errors.forEach((err) =>
      toast.error(err)
    );


    return errors.length === 0;


  };




  const isFormValid = () => {


    return (

      (!codeField ||
        formData[codeField]?.trim()
      )

      &&

      formData[nameField]?.trim()

    );


  };





  /* ---------------- SAVE ---------------- */


  const handleUpdate = async () => {


    try {


      setSaving(true);



      const payload = {

        [codeField]:
          formData[codeField],


        [nameField]:
          formData[nameField],


        active:
          formData.active,


      };



      // Add dynamic fields

      extraFields.forEach((field) => {


        payload[field.name] =
          formData[field.name];


      });





      if (isEdit) {


        await updateApi(

          editData[idField],

          payload

        );


        toast.success(
          `${title} updated successfully`
        );


      }
      else {


        await addApi(payload);


        toast.success(
          `${title} created successfully`
        );


      }




      onSuccess?.();

      onClose?.();



    }
    catch (error) {


      console.error(error);


      toast.error(
        `Unable to save ${title}`
      );


    }
    finally {


      setSaving(false);


    }


  };




  const handleSave = () => {


    if (!validate())
      return;


    handleUpdate();


  };




  if (!open)
    return null;



  return (

    <AnimatePresence>

      <motion.div

        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"

        initial={{
          opacity: 0
        }}

        animate={{
          opacity: 1
        }}

        exit={{
          opacity: 0
        }}

      >


        <motion.div

          initial={{
            opacity: 0,
            scale: 0.96,
            y: 20
          }}

          animate={{
            opacity: 1,
            scale: 1,
            y: 0
          }}

          exit={{
            opacity: 0,
            scale: 0.96,
            y: 20
          }}

          transition={{
            duration: 0.25
          }}

          className="w-full max-w-2xl overflow-hidden rounded-xl bg-white shadow-2xl"

        >


          {/* HEADER SAME AS YOUR UI */}

          <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-6 py-4">


            <div className="flex items-center gap-3">


              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">

                <FolderPlus size={22} />

              </div>



              <div>

                <h2 className="text-lg font-semibold text-gray-900">

                  {
                    isEdit
                      ? `Edit ${title}`
                      : `Add ${title}`
                  }

                </h2>


                <p className="text-sm text-gray-500">

                  {
                    isEdit
                      ? `Update ${title.toLowerCase()} information`
                      : `Create a new ${title.toLowerCase()}`
                  }

                </p>


              </div>


            </div>



            <button

              onClick={onClose}

              className="rounded-lg p-2 hover:bg-gray-100"

            >

              <X size={20} />

            </button>


          </div>
          {/* Body */}

          <div className="p-6">

            <div
              className={
                compactLayout
                  ? "grid grid-cols-2 gap-4"
                  : "grid grid-cols-1 gap-5"
              }
            >


              {/* Code */}

              {
                codeField && (

                  <div>

                    <label className="mb-2 block text-sm font-medium text-gray-700">

                      {codeLabel}

                      <span className="text-red-600">
                        {" "}*
                      </span>

                    </label>


                    <input

                      type="text"

                      name={codeField}

                      value={formData[codeField] || ""}

                      onChange={handleChange}

                      placeholder={`Enter ${codeLabel}`}

                      className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"

                    />


                  </div>

                )

              }





              {/* Name */}

              <div>

                <label className="mb-2 block text-sm font-medium text-gray-700">

                  {nameLabel}

                  <span className="text-red-600">
                    {" "}*
                  </span>

                </label>


                <input

                  type="text"

                  name={nameField}

                  value={formData[nameField] || ""}

                  onChange={handleChange}

                  placeholder={`Enter ${nameLabel}`}

                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"

                />


              </div>





              {/* Dynamic Extra Fields */}

              {
                extraFields.map((field) => (


                  <div key={field.name}>


                    <label className="mb-2 block text-sm font-medium text-gray-700">

                      {field.label}


                    </label>



                    {
                      field.type === "select" ?


                        <select

                          name={field.name}

                          value={
                            formData[field.name] || ""
                          }

                          onChange={handleChange}

                          className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"

                        >


                          <option value="">

                            Select {field.label}

                          </option>


                          {
                            field.options?.map((option) => (


                              <option

                                key={option.value}

                                value={option.value}

                              >

                                {option.label}

                              </option>


                            ))

                          }


                        </select>



                        :


                        <input

                          type="text"

                          name={field.name}

                          value={
                            formData[field.name] || ""
                          }

                          onChange={handleChange}

                          placeholder={`Enter ${field.label}`}

                          className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"

                        />


                    }



                  </div>


                ))

              }





              {/* Status */}

              <div
                className={
                  compactLayout
                    ? "col-span-2"
                    : ""
                }
              >


                <label className="mb-2 block text-sm font-medium text-gray-700">

                  Active Status

                </label>



                <div className="flex gap-8">


                  <label className="flex items-center gap-2">


                    <input

                      type="radio"

                      checked={
                        formData.active === true
                      }

                      onChange={() =>


                        setFormData({

                          ...formData,

                          active: true

                        })


                      }

                    />


                    <span>

                      Active

                    </span>


                  </label>





                  <label className="flex items-center gap-2">


                    <input

                      type="radio"

                      checked={
                        formData.active === false
                      }

                      onChange={() =>


                        setFormData({

                          ...formData,

                          active: false

                        })


                      }

                    />


                    <span>

                      Inactive

                    </span>


                  </label>



                </div>


              </div>



            </div>


          </div>






          {/* Footer */}

          <div className="flex justify-end gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4">



            <button

              onClick={onClose}

              className="rounded-lg border border-gray-300 px-5 py-2 text-sm font-medium hover:bg-gray-100"

            >

              Cancel

            </button>





            <button

              onClick={handleSave}

              disabled={
                saving || !isFormValid()
              }

              className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:bg-gray-400"

            >


              {
                saving

                  ?

                  isEdit
                    ?
                    "Updating..."
                    :
                    "Saving..."


                  :

                  isEdit

                    ?

                    `Update ${title}`

                    :

                    `Save ${title}`

              }


            </button>



          </div>




        </motion.div>


      </motion.div>


    </AnimatePresence>

  );

}