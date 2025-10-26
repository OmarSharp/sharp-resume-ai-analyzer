import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import {resumes} from "../../constants";
import ResumeCard from "~/components/ResumeCard";
import {usePuterStore} from "~/lib/puter";
import {useNavigate} from "react-router";
import {useEffect} from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "sharp-resume-ai-analyzer" },
    { name: "description", content: "Sharp Resume AI Analyzer" },
  ];
}

export default function Home() {

    const {auth} = usePuterStore();

    const navigate = useNavigate();

    useEffect(() => {
        if (!auth.isAuthenticated){
            navigate('/auth?next=/');
        }
    }, [auth.isAuthenticated]);

    return <main className="bg-purple-700 bg-cover">

      <Navbar />

      <section className="main-section">
          <div className="page-heading">
              <h1 className="font-bold">Track Your App & Resume Rating</h1>
              <h2>Review Your Submissions and check AI Powered Feedback</h2>
          </div>


      {resumes.length > 0 && (
          <div className="resumes-section">
              {resumes.map((resume) =>(
                  <ResumeCard key={resume.id} resume={resume}/>
              ))}

          </div>
      )}
      </section>
  </main>;
}
