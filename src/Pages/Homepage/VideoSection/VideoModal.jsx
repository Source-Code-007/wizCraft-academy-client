import ReactPlayer from 'react-player';
import modalBg from '../../../assets/img/signinBg.jpg'
import myVideo from '../../../assets/video/pexels-rdne-stock-project-8034309-1280x720-30fps.mp4'
import { FaMinus } from 'react-icons/fa';

const VideoModal = () => {
    return (
        <div>
            {/* Open the modal using ID.showModal() method */}
            <dialog id="my_modal_1" className="modal bg-center bg-cover bg-slate-900 bg-blend-overlay " style={{ backgroundImage: `url(${modalBg})` }}>
                <form method="dialog" className="modal-box p-0 relative h-[500px] max-w-4xl bg-transparent">

                    <ReactPlayer url={myVideo} controls height={'100%'} width={'100%'}/>

                    <div className="modal-action absolute top-0 right-2">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="cmn-btn-two "><FaMinus></FaMinus></button>
                    </div>
                </form>
            </dialog>
        </div>
    );
};

export default VideoModal;