import {Link, useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import {usePuterStore} from "~/lib/puter";
import ResumeDetails from "~/components/ResumeDetails";
import Ats from "~/components/Ats";
import ResumeSummary from "~/components/ResumeSummary";


export const meta  = () => ([
    {title: 'Sharp-Resume | Resume Result'},
    {name: 'description', content: 'Results of Your CV'},
])

const Resume = () => {
    const { auth, isLoading, fs, kv } = usePuterStore();

    const {id} = useParams();

    const [imageUrl, setImageUrl] = useState('');
    const [resumeUrl, setResumeUrl] = useState('');
    const [feedback, setFeedback] = useState<Feedback | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading && auth.isAuthenticated){
            navigate(`/auth?next=/resume/${id}`);
        }
    }, [isLoading]);

    useEffect(() => {
        const loadResume = async () => {
            const resume = await kv.get (`resume:${id}`);
            if (!resume) return;
            
            const data = JSON.parse(resume);
            
            const resumeBlob = await fs.read(data.resumePath);
            if (!resumeBlob) return;
            
            const pdfBlob = new Blob([resumeBlob], {type: 'application/pdf'});
            const resumeUrl = URL.createObjectURL(pdfBlob);
            setResumeUrl(resumeUrl);

            const imageBlob = await fs.read(data.imagePath);
            if (!imageBlob) return;
            const imageUrl = URL.createObjectURL(imageBlob);
            setImageUrl(imageUrl);

            setFeedback(data.feedback);
        }
        loadResume();
    }, [id]);



    // @ts-ignore
    return (
        <main className="!pt-0">
            resume results {id}
            <nav className="resume-nav">
                <Link to="/" className="back-button">
                    <img src="/icons/back.svg" alt="back-logo" className="w-2.5 h-2.5"/>
                    <span className="text-green-800 text-sm font-semibold">
                        Back To Home
                    </span>
                </Link>
            </nav>
            <div className="flex flex-row w-full max-lg:flex-col-reverse">
                <section className="feedback-section items-center justify-center bg-green-300 h-[100vh] sticky top-0">
                    {imageUrl && resumeUrl &&(
                        <div className="animate-in fade-in duration-700 gradient-border">
                            <a href={resumeUrl} target="_blank" rel='noopener'>
                                <img src={imageUrl} className=" w-full h-full object-contain rounded-lg" title="resume"/>
                            </a>

                        </div>
                    )}
                </section>

                <section className="feedback-section">
                    <h2 className=" text-3xl font-bold">Resume Review</h2>
                    {feedback ? (
                        <div className="flex flex-col gap-8 animate-out fade-out duration-700">
                            <ResumeSummary feedback = {feedback} />

                            <Ats score = {feedback.ATS.score || 0} suggestions = {feedback.ATS.tips || [] } />

                            <ResumeDetails feedback = {feedback} />

                        </div>
                    ):(
                        <img src="/images/resume-scan-2.gif" alt="scan" className="w-full"/>
                    )}
                </section>
            </div>
        </main>
    );
};

export default Resume;