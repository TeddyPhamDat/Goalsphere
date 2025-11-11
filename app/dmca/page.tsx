import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DMCA Policy | GoalSphere",
  description: "Chính sách bảo vệ bản quyền DMCA của GoalSphere",
};

export default function DMCAPage() {
  return (
    <main className="container-app py-8">
      <article className="max-w-4xl mx-auto card p-8">
        <h1 className="text-4xl font-bold text-[var(--navy)] mb-6">DMCA Policy</h1>
        <p className="text-zinc-600 mb-8">Digital Millennium Copyright Act</p>

        <section className="prose prose-lg max-w-none space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-[var(--navy)] mb-4">Copyright Protection</h2>
            <p className="text-zinc-700 leading-relaxed">
              GoalSphere respects the intellectual property rights of others and expects its users to do the same. 
              In accordance with the Digital Millennium Copyright Act (DMCA), we will respond to notices of alleged 
              copyright infringement that comply with the DMCA and other applicable laws.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[var(--navy)] mb-4">Reporting Copyright Infringement</h2>
            <p className="text-zinc-700 leading-relaxed mb-3">
              If you believe that your copyrighted work has been copied in a way that constitutes copyright infringement, 
              please provide our Copyright Agent with the following information:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-zinc-700">
              <li>An electronic or physical signature of the person authorized to act on behalf of the owner</li>
              <li>A description of the copyrighted work that you claim has been infringed</li>
              <li>A description of where the material is located on our website</li>
              <li>Your address, telephone number, and email address</li>
              <li>A statement that you have a good faith belief that the disputed use is not authorized</li>
              <li>A statement, under penalty of perjury, that the information is accurate</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[var(--navy)] mb-4">Contact Information</h2>
            <div className="bg-zinc-50 p-4 rounded-lg">
              <p className="text-zinc-700"><strong>DMCA Agent:</strong> GoalSphere Legal Team</p>
              <p className="text-zinc-700"><strong>Email:</strong> dmca@goalsphere.com</p>
              <p className="text-zinc-700"><strong>Address:</strong> GoalSphere Media, Legal Department</p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[var(--navy)] mb-4">Counter-Notification</h2>
            <p className="text-zinc-700 leading-relaxed">
              If you believe that your content was removed by mistake or misidentification, you may file a counter-notification 
              with our Copyright Agent containing the required information as outlined in the DMCA.
            </p>
          </div>
        </section>
      </article>
    </main>
  );
}
