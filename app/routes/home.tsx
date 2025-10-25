import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import {resumes} from "../../constants";
import ResumeCard from "~/components/ResumeCard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "sharp-resume-ai-analyzer" },
    { name: "description", content: "Sharp Resume AI Analyzer" },
  ];
}

export default function Home() {

    return <main className="bg-[url('/images/bg-main.svg')] bg-cover">

      <Navbar />

      <section className="main-section">
          <div className="page-heading">
              <h1>Track Your App & Resume Rating</h1>
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
