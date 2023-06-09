/* eslint-disable react/prop-types */
import { useRef } from "react";

const FeedbackModal = ({addFeedbackFunc}) => {
    const feedbackRef = useRef()
    return (
        <div>
            {/* Open the modal using ID.showModal() method */}
            <dialog id="my_modal_1" className="modal">
                <form method="dialog" className="modal-box max-w-2xl">

                    <div>
                        <label htmlFor="feedback" className="block mb-2 text-sm font-medium text-slate-800 dark:text-white">Feedback</label>
                        <textarea ref={feedbackRef} required className="my-inp w-full h-60" name="feedback" id="feedback" placeholder="Your feedback here"></textarea>
                    </div>

                    <div className="modal-action justify-center">
                        {/* if there is a button in form, it will close the modal */}
                        <button onClick={()=>addFeedbackFunc(feedbackRef.current.value)} className="cmn-btn-one">Add feedback</button>
                    </div>
                </form>
            </dialog>
        </div>
    );
};

export default FeedbackModal;