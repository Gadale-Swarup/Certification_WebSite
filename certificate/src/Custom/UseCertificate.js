    import { useRef } from 'react';

    const useCertificate = ({ name, course, startDate, endDate, awardedDate, certificateNo, certificateBackground }) => {
    const certificateRef = useRef();

    const certificateHTML = (
        <div
        ref={certificateRef}
        style={{
            position: "relative",
            width: "1000px",
            height: "772.5px",
            backgroundImage: `url(${certificateBackground})`,
            backgroundSize: "cover",
            margin: "20px",
            overflow: 'hidden',
            boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)',
        }}
        >
        {/* Dynamic Name Overlay */}
        <div style={{
            position: "absolute",
            top: "49.3%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "29px",
            color: "#1f1f1f",
            textAlign: "center",
            fontFamily: "Graduate",
        }}>
            {name}
        </div>

        {/* Dynamic Content */}
        <div style={{
            position: "absolute",
            top: "65%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "16.5px",
            color: "#1f1f1f",
            textAlign: "center",
            fontFamily: "Graduate",
            lineHeight: '2',
            width: "80%",
        }}>
            <span>{`FOR SUCCESSFULLY COMPLETING THE `}</span>
            <span style={{ color: '#ff5757' }}>{`"${course}"`}</span>
            <span>{ ` COURSE AT`}</span>
            <span>{ ` WISDOM SPROUTS IT TRAINING HUB, PUNE. FROM "${startDate}" TO `}</span>
            <span>{`"${endDate}" HIS/HER PERFORMANCE HAS BEEN SATISFACTORY SO AS TO FULFILL THE`}</span>
            <span>{ `REQUIREMENTS FOR SUCCESSFUL COMPLETION OF THE TRAINING. `}</span>
            <span>{`IN TESTIMONY THEREOF, THIS CERTIFICATE IS AWARDED ON THE ${awardedDate}.`}</span>
        </div>

        {/* Certificate Number */}
        <div style={{
            position: "absolute",
            bottom: "20px",
            right: "20px",  
            fontSize: "20px",
            color: "#1f1f1f",
            fontFamily: "Graduate",
        }}>
            {certificateNo}
        </div>
        </div>
    );

    return { certificateHTML, certificateRef };
    };

    export default useCertificate;
