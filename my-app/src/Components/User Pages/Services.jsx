import React, { useState } from 'react';
import './styles.css'
import PageTitle from "./PageTitle";

const Services = () => {
    const [individualLessonPackages, setIndividualLessonPackages] = useState(false);
    const [groupLessonPackages, setGroupLessonPackages] = useState(false);
    const [ridingStylePackages, setRidingStylePackages] = useState(false);
    const [competitionPackages, setCompetitionPackages] = useState(false);
    console.log(individualLessonPackages);
    return (
        <div>
            <PageTitle name="Services" />  
            <div style={{marginTop: '400px'}}>
                <div onClick={() => setIndividualLessonPackages(!individualLessonPackages)}>Individual Lesson Packages
                    {individualLessonPackages && <div>
                        <div>Beginner Lessons
                            <p></p>
                        </div>
                            <p></p>
                        <div>Intermediate Lessons</div>
                            <p></p>
                        <div>Advanced Lessons</div>
                            <p></p>
                    </div>}
                </div>
                <div onClick={() => setGroupLessonPackages(!groupLessonPackages)}>Group Lesson Packages
                    {groupLessonPackages && <div>
                        <div>Beginner Lessons
                            <p></p>
                        </div>
                            <p></p>
                        <div>Intermediate Lessons</div>
                            <p></p>
                        <div>Advanced Lessons</div>
                            <p></p>
                    </div>}
                </div>
                <div onClick={() => setRidingStylePackages(!ridingStylePackages)}>Riding Style Packages
                    {ridingStylePackages && <div>
                        <div>Beginner Lessons
                            <p></p>
                        </div>
                            <p></p>
                        <div>Intermediate Lessons</div>
                            <p></p>
                        <div>Advanced Lessons</div>
                            <p></p>
                    </div>}
                </div>
                <div onClick={() => setCompetitionPackages(!competitionPackages)}>Competition Packages
                    {competitionPackages && <div>
                        <div>Beginner Lessons
                            <p></p>
                        </div>
                            <p></p>
                        <div>Intermediate Lessons</div>
                            <p></p>
                        <div>Advanced Lessons</div>
                            <p></p>
                    </div>}
                </div>
            </div>
        </div>
    );
}

export default Services;