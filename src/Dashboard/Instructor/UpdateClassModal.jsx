/* eslint-disable react/prop-types */
import React from 'react';

const UpdateClassModal = ({ updateClassFunc, forUpdateClass }) => {
    return (
        <dialog id="my_modal_1" className="modal">
            <form onSubmit={updateClassFunc} method="dialog" className="modal-box max-w-2xl bg-slate-800 bg-opacity-90">

                <div className='relative'>
                    <label htmlFor="className" className="block mb-2 text-sm font-medium text-slate-300 dark:text-white">Name</label>
                    <input defaultValue={forUpdateClass.className} type='text' id='className' name='className' className='my-inp' />
                </div>
                <div className='relative'>
                    <label htmlFor="price" className="block mb-2 text-sm font-medium text-slate-300 dark:text-white">Price</label>
                    <input defaultValue={forUpdateClass.price} type='text' id='price' name='price' className='my-inp' />
                </div>
                <div className='relative'>
                    <label htmlFor="img" className="block mb-2 text-sm font-medium text-slate-300 dark:text-white">Image</label>
                    <input defaultValue={forUpdateClass.classImg} type='url' id='img' name='classImg' className='my-inp' />
                </div>

                <div className="modal-action">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="cmn-btn-one" type='submit'>Update</button>
                </div>
            </form>
        </dialog>
    );
};

export default UpdateClassModal;