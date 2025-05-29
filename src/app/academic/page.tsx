import Link from 'next/link'
import Image from 'next/image'
import Navigation from '@/components/Navigation'
import SocialLinks from '@/components/SocialLinks'

export default function Academic() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
           <>
           <h1>Kate Holterhoff's Curriculumn Vitae</h1>
            <div id="research">
              <h2>Research &amp; Teaching Areas</h2>
              <ul>
                <li>19C Literature</li>
                <li>Periodical Studies</li>
                <li>History of Science: Evolution</li>
                <li>Visual Culture</li>
                <li>Digital Humanities</li>
                <li>Gender, Race &amp; Class Identities</li>
                <li>Adventure Fiction</li>
                <li>TechComm</li>
              </ul>
            </div>
            <div id="professional appointments">
              <h2>Professional Appointments</h2>
              <table>
                <tbody>
                  <tr>
                    <td>Affiliated Researcher, Georgia Institute of Technology</td>
                    <td>2019-Present</td>
                  </tr>
                  <tr>
                    <td>Technical Editor, COVE</td>
                    <td>2018-2022</td>
                  </tr>
                  <tr>
                    <td>
                      Marion L. Brittain Postdoctoral Fellow, Georgia Institute of
                      Technology
                    </td>
                    <td>2016-2018</td>
                  </tr>
                  <tr>
                    <td>
                      Full-time Instructor, University of Massachusetts at Dartmouth
                    </td>
                    <td>2016</td>
                  </tr>
                  <tr>
                    <td>Instructor, Saint Anselm College</td><td>2012-15</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div id="education">
              <h2>Education</h2>
              <table>
                <tbody>
                  <tr>
                    <td>
                      Ph.D. in Literary and Cultural Studies, Carnegie Mellon
                      University
                    </td>
                    <td>2016</td>
                  </tr>
                  <tr>
                    <td>
                      MA in English and Comparative Literature, University of
                      Cincinnati
                    </td>
                    <td>2009</td>
                  </tr>
                  <tr>
                    <td>
                      BA in English, University of Cincinnati,{" "}
                      <em>Magna Cum Laude</em>
                    </td>
                    <td>2007</td>
                  </tr>
                  <tr>
                    <td>
                      BFA in Fine Art, University of Cincinnati, College of Design Art
                      Architecture &amp; Planning, <em>Magna Cum Laude</em>
                    </td>
                    <td>2006</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div id="publications">
              <h2>Books</h2>
              <p>
                <em>
                  <a href="https://www.ohioswallow.com/9780821425961/speculation-and-the-darwinian-method-in-british-romance-fiction-1859-1914/">
                    Speculation and the Darwinian Method in British Romance Fiction,
                    1859-1914
                  </a>
                </em>
                . Series in Victorian Studies. Athens: Ohio University Press, 2025.
              </p>
              <p>
                <em>
                  <a href="https://www.routledge.com/Illustration-in-Fin-de-Siecle-Transatlantic-Romance-Fiction/Holterhoff/p/book/9780367862091">
                    Illustration in Fin-de-Siècle Transatlantic Romance Fiction
                  </a>
                </em>
                . British Art: Histories and Interpretations since 1700 series. New
                York: Routledge, 2022.
              </p>
              <h3>Journal Articles</h3>
              <p>
                "
                <a href="https://www.oxfordbibliographies.com/display/document/obo-9780199799558/obo-9780199799558-0194.xml">
                  Adventure Literature
                </a>
                ."{" "}
                <em>
                  <a href="https://www.oxfordbibliographies.com/obo/page/victorian-literature">
                    Oxford Bibliographies in Victorian Literature
                  </a>
                </em>
                . Ed. Lisa Rodensky. New York: Oxford University Press, 2023.
              </p>
              <p>
                "
                <a href="https://muse.jhu.edu/article/819751/summary">
                  Illustrating White Cannibals in <em>Harper's Weekly</em>: Adventure
                  Fiction and Pictorial Journalism
                </a>
                ." <em>American Periodicals: A Journal of History &amp; Criticism</em>
                . 31.2 (2021): 134-154.
              </p>
              <p>
                "
                <a href="https://scholarworks.iu.edu/journals/index.php/josotl/article/view/32982">
                  Audio Guides for Digital Archives
                </a>
                ." <em>Journal of the Scholarship of Teaching and Learning</em>. 21.2
                (2021): 144-146.
              </p>
              <p>
                "
                <a href="https://muse.jhu.edu/article/731585/summary">
                  Late-Nineteenth-Century Adventure Fiction and the Anthropocene
                </a>
                ." <em>Configurations</em>. 27.3 (2019): 271-300.
              </p>
              <p>
                "
                <a href="https://academic.oup.com/jvc/article/24/3/354/5557724">
                  Social Justice and Victorian Digital Humanities
                </a>
                ." <em>Journal of Victorian Culture</em>'s Digital Forum. 24.3 (July
                2019): 354-360.
              </p>
              <p>
                "
                <a href="http://www.digitalhumanities.org/dhq/vol/11/3/000324/000324.html">
                  From Disclaimer to Critique: Race and the Digital Image Archivist
                </a>
                ." <em>Digital Humanities Quarterly</em>. 11.3 (2017).
              </p>
              <p>
                "
                <a href="https://muse.jhu.edu/article/657904">
                  Egyptology and Darwinian Evolution in Conan Doyle and H. Rider
                  Haggard: The Scientific Imagination.
                </a>
                " <em>English Literature in Transition, 1880-1920</em>. 60.3 (June
                2017): 314-340.
              </p>
              <p>
                "
                <a href="http://dx.doi.org/10.1080/13555502.2016.1152877">
                  Liberal Evolutionism and the Satirical Ape
                </a>
                ." <em>Journal of Victorian Culture</em>. 21.2 (2016): 1-21.
              </p>
              <p>
                "
                <a href="http://link.springer.com/article/10.1007%2Fs10739-014-9377-0">
                  The History and Reception of Charles Darwin's Hypothesis of
                  Pangenesis
                </a>
                ." <em>The Journal of the History of Biology.</em> 47.4 (2014):
                661-95.
              </p>
              <p>
                "
                <a href="http://www.victoriannetwork.org/index.php/vn/article/view/13">
                  Beauty as a Terministic Screen in Charles Darwin's{" "}
                  <em>The Descent of Man</em>
                </a>
                ." <em>Victorian Network</em>. 2.1 (Summer 2010): 49-69.{" "}
              </p>
              <p>
                "
                <a href="http://jvc.oup.com/2013/10/21/ethics-and-the-digital-archive-the-case-for-visualizing-h-rider-haggard/">
                  Ethics and the Digital Archive: The Case for Visualizing H. Rider
                  Haggard
                </a>
                ." <em>Journal of Victorian Culture Online.</em> Ed. Lisa Hager.
                Neo-Victorian Studies &amp; Digital Humanities Week 2013. 21 October
                2013.{" "}
              </p>
              <h2>Book Chapters</h2>
              <p>
                "
                <a href="https://www.degruyter.com/document/doi/10.7765/9781526161703.00020/pdf?licenseType=restricted">
                  Romance Fiction, Folk Tales, and Poetry: Amy Sawyer and the Arts and
                  Crafts Movement
                </a>
                ."{" "}
                <em>
                  <a href="https://manchesteruniversitypress.co.uk/9781526161697/">
                    Nineteenth-Century Women Illustrators and Cartoonists
                  </a>
                </em>
                . Ed. Joanna Devereux (Manchester: Manchester University Press, 2023):
                195-208.
              </p>
              <p>
                "
                <a href="https://books.google.com/books/about/Re_examining_Arthur_Conan_Doyle.html?id=5StCEAAAQBAJ&printsec=frontcover&source=kp_read_button&hl=en&newbks=1&newbks_redir=0#v=onepage&q&f=false">
                  'An absurd parody of the Professor': Illustrating Professor
                  Challenger
                </a>
                ."{" "}
                <em>
                  <a href="https://www.cambridgescholars.com/product/978-1-5275-7281-2">
                    Re-examining Arthur Conan Doyle
                  </a>
                </em>
                . Ed. Nils Clausson (Newcastle upon Tyne: Cambridge Scholars, 2021):
                116-140.
              </p>
              <p>
                "
                <a href="https://brill.com/view/book/edcoll/9789004426566/BP000003.xml">
                  Picturing Africa: Illustration in the Allan Quatermain Adventure
                  Fictions of H. Rider Haggard.
                </a>
                "{" "}
                <em>
                  Imperial Middlebrow: Cross-colonial Encounters and Expressions of
                  Power in Middlebrow Literature and Culture, 1890-1940
                </em>
                . Eds. Christoph Ehland and Jana Gohrisch (Leiden: Brill, 2020):
                44-71.
              </p>
              <p>
                "Science."{" "}
                <a href="https://mcfarlandbooks.com/product/companion-to-victorian-popular-fiction/">
                  <em>Companion to Victorian Popular Fiction</em>
                </a>
                . Ed. Kevin A. Morrison (Jefferson: McFarland, 2018): 207-209.
              </p>
              <p>
                "Liminality and Power in Bram Stoker's <em>Jewel of Seven Stars</em>."{" "}
                <a href="https://books.google.com/books/about/From_Wollstonecraft_to_Stoker.html?id=FLvJsajyk_8C&printsec=frontcover&source=kp_read_button#v=onepage&q&f=false">
                  <em>
                    Critical Essays on Victorian Gothic and Sensation Fiction from
                    Wollstonecraft to Stoker
                  </em>
                </a>
                . Ed Dr. Marilyn Brock (Jefferson: McFarland, 2009): 132-43.
              </p>
              <h2>Special Issues Edited for Journal</h2>
              <p>
                <a href="http://www.ncgsjournal.com/issue112/issue112.htm">
                  "Illustration and Gender." Special Edition of{" "}
                  <em>Nineteenth‑Century Gender Studies</em>
                </a>
                . Eds. Kate Holterhoff and Nicole Lobdell. 11.2 (Summer 2015).
              </p>
              <h2>Public Writing</h2>
              <p>
                <a href="https://css-tricks.com/add-background-colors-to-svgs-using-the-rect-element/">
                  "Add Background Colors to SVGs Using the "rect" Element."{" "}
                </a>
                <em>CSS Tricks</em>. 20 February 2020.
              </p>
              <p>
                <a href="https://www.neboagency.com/blog/how-i-learned-to-stop-worrying-and-love-engineering-documentation/">
                  "How I Learned to Stop Worrying and Love Engineering Documentation."{" "}
                </a>
                <em>Nebo Blog</em>. 21 June 2019.
              </p>
              <p>
                <a href="https://www.neboagency.com/blog/from-academic-to-developer-why-career-changes-are-no-longer-off-limits/">
                  "From Academic to Developer: Why Career Changes are No Longer Off
                  Limits."{" "}
                </a>
                <em>Nebo Blog</em>. 25 January 2019.
              </p>
              <p>
                <a href="https://www.chronicle.com/blogs/profhacker/genius-alternative-social-media/65695">
                  "Genius.com as an Alternative Social Media."{" "}
                </a>
                <em>ProfHacker: The Chronicle of Higher Education</em>. 30 August
                2018.
              </p>
              <p>
                <a href="https://medium.com/@kateholterhoff/visualizing-the-bicycle-and-the-new-woman-in-the-ladys-realm-b1c7cf91048">
                  "Visualizing the Bicycle and the New Woman in 'The Lady's Realm.'"
                </a>{" "}
                <em>Medium</em>. 31 May 2018.
              </p>
              <p>
                "Visual Haggard: The Illustration Archive."{" "}
                <em>Rider Haggard Society Journal</em>. 126 (July 2018): 4-6.
              </p>
              <p>
                <a href="https://www.chronicle.com/blogs/profhacker/digital-archives-data-set-creation/64390">
                  "Using Digital Archives to Teach Data Set Creation and Visualization
                  Design."
                </a>{" "}
                <em>ProfHacker: The Chronicle of Higher Education</em>. 29 Sep. 2017.
              </p>
              <p>
                "Report II: Poetry and Melancholia Conference."{" "}
                <em>Society for the Social History of Medicine Gazette</em>. 55
                (December 2014): 6.
              </p>
              <p>
                "Ethics and the Digital Archive: The Case for Visualizing H. Rider
                Haggard." <em>Journal of Victorian Culture Online</em>. Neo-Victorian
                Studies &amp; Digital Humanities Week 2013. 21 Oct. 2013.
              </p>
              <h2>Books Edited</h2>
              <p>
                <a href="https://www.victoriansecrets.co.uk/book/the-autobiography-of-christopher-kirkland/">
                  <em>The Autobiography of Christopher Kirkland </em>by Eliza Lynn
                  Linton{" "}
                </a>{" "}
                [1885]. Eds. Deborah Meem and Kate Holterhoff. Brighton, UK:{" "}
                <em>Victorian Secrets</em>, 2011.
              </p>
              <p>
                <a href="https://www.victoriansecrets.co.uk/book/sowing-the-wind/">
                  <em>Sowing the Wind</em> by Eliza Lynn Linton
                </a>{" "}
                [1867]. Eds. Deborah Meem and Kate Holterhoff. Brighton, UK:{" "}
                <em>Victorian Secrets</em>, 2014.
              </p>
              <h2>Books Reviewed</h2>
              <p>
                <a href="https://www.journals.uchicago.edu/doi/10.1086/717027">
                  <em>
                    Catastrophic Thinking: Extinction and the Value of Diversity from
                    Darwin to the Anthropocene by David Sepkoski
                  </em>
                </a>{" "}
                (Chicago: University of Chicago Press, 2020). Reviewed for{" "}
                <em>Isis</em>. 112.4 (December 2021): 848-849.
              </p>
              <p>
                <a href="http://v21collective.org/collations-book-forum-on-sarah-allisons-reductive-reading-a-syntax-of-victorian-moralizing/">
                  <em>
                    Reductive Reading: A Syntax of Victorian Moralizing by Sarah
                    Allison
                  </em>
                </a>{" "}
                (Baltimore: Johns Hopkins UP, 2018). Reviewed for <em>V21</em>'s
                Collations: Book Forum. 17 June 2019.
              </p>
              <p>
                <a href="http://muse.jhu.edu/article/710491/pdf">
                  <em>
                    Haunting Modernity and the Gothic Presence in British Modernist
                    Literature
                  </em>{" "}
                  by Daniel Darvay
                </a>{" "}
                (Switzerland: Palgrave, 2016). Reviewed for{" "}
                <em>English Literature in Transition, 1880-1920</em>. 62.1 (2019):
                118-122.
              </p>
              <p>
                <a href="https://muse.jhu.edu/article/711537/pdf">
                  <em>
                    Evolution and Imagination in Victorian Children's Literature
                  </em>{" "}
                  by Jessica Straley
                </a>{" "}
                (Cambridge: Cambridge UP, 2016). Reviewed for{" "}
                <em>Victorian Review</em>. 43.2 (2018): 311-314.
              </p>
              <p>
                <a href="https://www.jstor.org/stable/10.5621/sciefictstud.45.2.0341?seq=1#page_scan_tab_contents">
                  "What Mary Shelley Can Teach STEM Readers."
                </a>{" "}
                Review of{" "}
                <em>
                  Frankenstein or, The Modern Prometheus: Annotated for Scientists,
                  Engineers, and Creators of all Kinds
                </em>{" "}
                by Mary Shelley (Cambridge: MIT, 2017). Reviewed for{" "}
                <em>Science Fiction Studies</em>. 45.2 (2018): 341-344.
              </p>
              <p>
                <em>
                  <a href="https://muse.jhu.edu/article/690561">
                    Before Einstein: The Fourth Dimension in Fin de Siècle Literature
                    and Culture
                  </a>
                </em>
                <a href="https://muse.jhu.edu/article/690561">
                  {" "}
                  by Elizabeth L. Throesch
                </a>{" "}
                (New York: Anthem Press, 2017). Reviewed for{" "}
                <em>English Literature in Transition, 1880-1920</em>. 61.3 (2018):
                396-399.
              </p>
              <p>
                <em>
                  <a href="https://www.cambridge.org/core/journals/journal-of-british-studies/article/kathleen-frederickson-the-ploy-of-instinct-victorian-sciences-of-nature-and-sexuality-in-liberal-governance-forms-of-living-new-york-fordham-university-press-2014-pp-236-10500-cloth/14C2ABB3EE4D5B5EE3C45AD76E9981C4#fndtn-information">
                    The Ploy of Instinct: Victorian Sciences of Nature and Sexuality
                    in Liberal Governance
                  </a>
                </em>
                <a href="https://www.cambridge.org/core/journals/journal-of-british-studies/article/kathleen-frederickson-the-ploy-of-instinct-victorian-sciences-of-nature-and-sexuality-in-liberal-governance-forms-of-living-new-york-fordham-university-press-2014-pp-236-10500-cloth/14C2ABB3EE4D5B5EE3C45AD76E9981C4#fndtn-information">
                  {" "}
                  by Kathleen Frederickson
                </a>{" "}
                (New York: Fordham University Press, 2014). Reviewed for{" "}
                <em>the Journal of British Studies</em>. 56.2 (2017): 424-25.
              </p>
              <p>
                <em>
                  <a href="http://sites.bu.edu/impact/previous-issues/impact-winter-2017/education-in-nineteenth-century-british-literature-exclusion-as-innovation/">
                    Education in Nineteenth-Century British Literature: Exclusion as
                    Innovation
                  </a>
                </em>
                <a href="http://sites.bu.edu/impact/previous-issues/impact-winter-2017/education-in-nineteenth-century-british-literature-exclusion-as-innovation/">
                  {" "}
                  by Sheila Cordner
                </a>{" "}
                (New York: Routledge, 2016). Reviewed for <em>Impact</em>. 6.1 (Winter
                2017).
              </p>
            </div>
            <div id="dh project">
              <h2>Digital Humanities Project</h2>
              <h3>
                <table>
                  <tbody>
                    <tr style={{ backgroundColor: "#fff" }}>
                      <td>
                        <a href="https://web.archive.org/web/20220815220555/http://www.visualhaggard.org/">
                          Visual Haggard: The Illustration Archive
                        </a>
                      </td>
                      <td>Director &amp; Editor</td>
                    </tr>
                  </tbody>
                </table>
              </h3>
              <p>
                I direct and edit <em>Visual Haggard</em>, a digital archive intended
                to preserve, centralize, and improve access to the illustrations from
                the novels published by H. Rider Haggard. Although the archive is{" "}
                <a href="https://redmonk.com/kholterhoff/2022/12/01/the-end-of-herokus-free-tier/">
                  currently offline
                </a>{" "}
                (it is accessible using the{" "}
                <a href="https://web.archive.org/web/20220815220555/http://www.visualhaggard.org/">
                  Wayback Machine
                </a>
                ), this a literary and art historical resource aspires to make all
                Haggard illustrations readily available in a high-resolution and
                mobile device appropriate format. Currently, the site contains 1,900
                images and receives approximately 1,500 page views every month. Visual
                Haggard is a federated archive with{" "}
                <a href="http://www.nines.org/">
                  NINES, the Networked Infrastructure for Nineteenth-Century
                  Electronic Scholarship
                </a>
                .
              </p>
            </div>
            <div id="teaching">
              <h2>Courses Taught</h2>
              <h3>Georgia Institute of Technology</h3>
              <table>
                <tbody>
                  <tr>
                    <td>CS 3311/ LMC 3432</td>
                    <td>
                      <a href="https://docs.google.com/document/d/1Y8hcGB7fK9Kq7NcljnrApaXI1SAhwvvNm78yIy06D3I/edit?usp=sharing">
                        Junior Design: Project Design and Technical Communication
                        Strategies
                      </a>
                    </td>
                    <td>2018</td>
                  </tr>
                  <tr>
                    <td>ENGL 1102</td>
                    <td>
                      {/* <a href="courses/S18_ENG_1102/Victorian_Digital_Humanities.md"> */}
                      Victorian Digital Humanities
                      {/* </a> */}
                    </td>
                    <td>2018</td>
                  </tr>
                  <tr>
                    <td>ENGL 1102</td>
                    <td>
                      {/* <a href="courses/F17_ENG_1102/Victorians_In_Cyberspace.md"> */}
                      Victorians in Cyberspace
                      {/* </a> */}
                    </td>
                    <td>2017</td>
                  </tr>
                  <tr>
                    <td>ENGL 1102</td>
                    <td>
                      <a href="http://1102vcdahrh.wordpress.com/">
                        Visual Culture, Digital Archives and H. Rider Haggard
                      </a>
                    </td>
                    <td>2017</td>
                  </tr>
                  <tr>
                    <td>ENGL 1102</td>
                    <td>
                      <a href="http://1102theliteratureofnewmedia.weebly.com/">
                        The Literature of New Media
                      </a>
                    </td>
                    <td>2016</td>
                  </tr>
                </tbody>
              </table>
              <h3>University of Massachusetts at Dartmouth</h3>
              <table>
                <tbody>
                  <tr>
                    <td>ENL 684</td>
                    <td>
                      <a href="https://literarystudiesandtheoryspring2016.wordpress.com/">
                        Literary Studies and Theory
                      </a>
                      <a />
                    </td>
                    <td>2016</td>
                  </tr>
                  <tr>
                    <td>ENL 200</td>
                    <td>Studies in Literature: Victorian Romance and Realism</td>
                    <td>2016</td>
                  </tr>
                  <tr>
                    <td>ENL 200</td>
                    <td>
                      Studies in Literature:{" "}
                      <span style={{ fontStyle: "italic" }}>Fin de Siècle</span>{" "}
                      Adventure Fiction
                    </td>
                    <td>2016</td>
                  </tr>
                </tbody>
              </table>
              <h3>Saint Anselm College</h3>
              <table>
                <tbody>
                  <tr>
                    <td>EN 105</td>
                    <td>Freshman English</td>
                    <td>2014-15</td>
                  </tr>
                  <tr>
                    <td>HU 101, 102, 201, 202</td>
                    <td>Portraits of Human Greatness</td>
                    <td>2012-14</td>
                  </tr>
                </tbody>
              </table>
              <h3>New Hampshire Institute of Art</h3>
              <table>
                <tbody>
                  <tr>
                    <td>AHT 399</td>
                    <td>Art and Identity</td>
                    <td>2015</td>
                  </tr>
                  <tr>
                    <td>AHT 201</td>
                    <td>Survey of Art History</td>
                    <td>2015</td>
                  </tr>
                </tbody>
              </table>
              <h3>Carnegie Mellon University</h3>
              <table>
                <tbody>
                  <tr>
                    <td>ENG 213</td>
                    <td>Victorian Women Writers</td>
                    <td>2012</td>
                  </tr>
                  <tr>
                    <td>ENG 213</td>
                    <td>Victorian Detectives</td>
                    <td>2011</td>
                  </tr>
                  <tr>
                    <td>ENG 101</td>
                    <td>Interpretation and Argument: Achieving a Public Art</td>
                    <td>2010-11</td>
                  </tr>
                </tbody>
              </table>
              <h3>University of Cincinnati</h3>
              <table>
                <tbody>
                  <tr>
                    <td>15 ENGL 102H</td>
                    <td>Honors English Composition</td>
                    <td>2009</td>
                  </tr>
                  <tr>
                    <td>15 ENGL 101,102</td>
                    <td>English Composition</td>
                    <td>2007-08</td>
                  </tr>
                </tbody>
              </table>
              <br />
            </div>
</>
 

            

            
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto py-8 text-center">
        <div className="flex flex-col items-center space-y-4">
          <SocialLinks />
          <p className="text-sm text-gray-600">© 2025 Kate Holterhoff</p>
        </div>
      </footer>
    </div>
  )
}
