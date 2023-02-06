// import React, { useEffect } from "react";
// import SettingsVoiceIcon from "@mui/icons-material/SettingsVoice";
// import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { useRecorder } from "react-recorder-voice";
// import Audio from "./audio_pin/Audio";

// const formatTimer = (timer) => {
//   let hours = String(parseInt(timer / (60 * 60)));
//   hours = hours.padStart(2, "0");
//   timer = timer % (60 * 60);

//   let minutes = String(parseInt(timer / 60));
//   minutes = minutes.padStart(2, "0");
//   timer = timer % 60;

//   let seconds = String(parseInt(timer));
//   seconds = seconds.padStart(2, "0");

//   return `${hours} :${minutes} : ${seconds}`;
// };

// const AddAudioToNote = ({ uploadAudio, deleteAudio, audioSrc }) => {
//   const {
//     audioURL,
//     audioData,
//     timer,
//     recordingStatus,
//     cancelRecording,
//     saveRecordedAudio,
//     startRecording,
//   } = useRecorder();

//   useEffect(() => {
//     if (recordingStatus === "save") uploadAudio(audioData);
//     if (recordingStatus === "cancel") deleteAudio();
//   }, [audioData, recordingStatus, uploadAudio, deleteAudio]);

//   if (audioSrc?.length > 0) return;

//   return (
//     <div className="mb-24 relative">
//       <div className="flex items-center gap-12 ">
//         {recordingStatus === "inactive" ? null : recordingStatus !==
//           "recording" ? (
//           <button
//             onClick={() => {
//               try {
//                 // startRecording();
//               } catch (error) {
//                 console.log(error);
//               }
//             }}
//           >
//             <SettingsVoiceIcon className="text-3xl text-gray-100" />
//           </button>
//         ) : (
//           <div className="flex items-center gap-6">
//             <button
//               onClick={() => {
//                 try {
//                   // cancelRecording();
//                 } catch (error) {
//                   console.log(error);
//                 }
//               }}
//             >
//               <DeleteIcon className="text-gray-100" />
//             </button>
//             <button
//               onClick={() => {
//                 try {
//                   // saveRecordedAudio();
//                 } catch (error) {
//                   console.log(error);
//                 }
//               }}
//             >
//               <FiberManualRecordIcon className="text-gray-100" />
//             </button>
//           </div>
//         )}
// {/* 
//         <div className="bg-gray-800 w-fit px-3 text-white flex justify-center rounded-md relative top-3">
//           <p>{formatTimer(timer)}</p>
//         </div>
//         <div className="absolute left-0 right-0 top-12">
//           <Audio audioURL={audioURL} />
//         </div> */}
//       </div>
//     </div>
//   );
// };

// export default AddAudioToNote;
