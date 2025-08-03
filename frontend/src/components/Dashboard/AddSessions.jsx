import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { supabase } from '../../utils/supabase';
import { createSession } from '../../services/operations/SessionDetailsApi';
import { toast } from 'react-toastify';
import ConfirmationModal from '../Common/ConfirmationModal';
import ChipInput from './ChipInput';
export const AddSessions = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const [status, setStatus] = useState("published");
   const [confirmationModal, setConfirmationModal] = useState(null)

  const onSubmit = (statusParam) => async (data) => {
    const { sessionTitle, sessionTag, sessionDescription } = data;

    const sessionJSON = { description: sessionDescription };
    const jsonBlob = new Blob([JSON.stringify(sessionJSON)], {
      type: 'application/json',
    });

    // Sanitize title to avoid Supabase storage issues
    const cleanTitle = sessionTitle
      .trim()
      .replace(/\s+/g, '_') // replace spaces with underscores
      .replace(/[^a-zA-Z0-9-_]/g, ''); // remove special characters

    const fileName = `${cleanTitle}-${Date.now()}.json`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('sessions')
      .upload(fileName, jsonBlob);

    if (uploadError) {
      console.error('Upload failed:', uploadError);
      toast.error('Failed to upload session description.');
      return;
    }

    const { data: publicUrlData } = supabase.storage
      .from('sessions')
      .getPublicUrl(fileName);

    const sessionData = {
      title: sessionTitle,
      tags: sessionTag,
      json_file_url: publicUrlData.publicUrl,
      status: statusParam,
    };

    try {
      await dispatch(createSession(sessionData));
    
    } catch (error) {
      console.error(error);
      toast.error('Failed to create session.');
    }
  };

  return (
    <>
    <form
      onSubmit={handleSubmit(onSubmit(status))}
      className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6"
    >
      {/* Session Title */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="sessionTitle">
          Session Title <sup className="text-pink-200">*</sup>
        </label>
        <input
          type="text"
          id="sessionTitle"
          placeholder="Enter Session Title"
          className="form-style w-full bg-richblack-700 text-white px-4 py-2"
          {...register('sessionTitle', { required: true })}
        />
        {errors.sessionTitle && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Session title is required
          </span>
        )}
      </div>

       {/* Course Tags */}
      <ChipInput
        label="sessionTag"
        name="sessionTag"
        placeholder="Enter Tags and press Enter"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />

      {/* Session Description */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="sessionDescription">
          Description <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="sessionDescription"
          placeholder="Enter Session description"
          {...register('sessionDescription', { required: true })}
          className="form-style resize-x-none min-h-[130px] w-full bg-richblack-700"
        />
        {errors.sessionDescription && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Session description is required
          </span>
        )}
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          type="button"
          onClick={() =>
                         setConfirmationModal({
                           text1: "Are you sure?",
                           text2: "The Session Will Be Published",
                           btn1Text: "Publish",
                           btn2Text: "Cancel",
                           btn1Handler: () => dispatch(handleSubmit(onSubmit('published'))),
                           btn2Handler: () => setConfirmationModal(null),
                         })
            }
          className="w-full rounded-md bg-yellow-50 px-4 py-2 font-semibold text-richblack-900 hover:bg-yellow-100"
        >
          Publish this Session
        </button>

        <button
          type="button"
          onClick={() =>
                         setConfirmationModal({
                           text1: "Are you sure?",
                           text2: "The Session Will Be Saved As A Drraft",
                           btn1Text: "Draft",
                           btn2Text: "Cancel",
                           btn1Handler: () => dispatch(handleSubmit(onSubmit('draft'))),
                           btn2Handler: () => setConfirmationModal(null),
                         })
            }
          className="w-full rounded-md bg-yellow-50 px-4 py-2 font-semibold text-richblack-900 hover:bg-yellow-100"
        >
          Save as Draft
        </button>
      </div>
    </form>
     {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
};
