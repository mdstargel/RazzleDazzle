import React, { useState } from 'react';
import './styles.css'
import PageTitle from "./PageTitle";

const Services = () => {
    const [individualLessonPackages, setIndividualLessonPackages] = useState(false);
    const [groupLessonPackages, setGroupLessonPackages] = useState(false);
    const [ridingStylePackages, setRidingStylePackages] = useState(false);
    const [competitionPackages, setCompetitionPackages] = useState(false);
    
    const rightCaret = (
        <span>></span>
    );
    const downCaret = (
        <span>v</span>
    );
    return (
        // Need to reinsert on line 22 (original stuff: <div style={{ marginTop: '400px' }}>)
        <div className='backGround'>
            <PageTitle name="Services" />
            
            <div className='form3'> 
                <div className='serviceLabel' onClick={() => setIndividualLessonPackages(!individualLessonPackages)}>
                    {individualLessonPackages ? downCaret : rightCaret} Individual Lesson Packages
                    {individualLessonPackages && <div>
                        <div className='serviceLabel'>Beginner Lessons
                            <p></p>
                        </div>
                            <p></p>
                        <div className='serviceLabel'>Intermediate Lessons</div>
                            <p></p>
                        <div className='serviceLabel'>Advanced Lessons</div>
                            <p></p>
                    </div>}
                </div>
                <div className='serviceLabel' onClick={() => setGroupLessonPackages(!groupLessonPackages)}>
                    {groupLessonPackages ? downCaret : rightCaret} Group Lesson Packages
                    {groupLessonPackages && <div>
                        <div className='serviceLabel'>Beginner Lessons
                            <p></p>
                        </div>
                            <p></p>
                        <div className='serviceLabel'>Intermediate Lessons</div>
                            <p></p>
                        <div className='serviceLabel'>Advanced Lessons</div>
                            <p></p>
                    </div>}
                </div>
                <div className='serviceLabel' onClick={() => setRidingStylePackages(!ridingStylePackages)}>
                    {ridingStylePackages ? downCaret : rightCaret} Riding Style Packages
                    {ridingStylePackages && <div>
                        <div className='serviceLabel'>Beginner Lessons
                            <p></p>
                        </div>
                            <p></p>
                        <div className='serviceLabel'>Intermediate Lessons</div>
                            <p></p>
                        <div className='serviceLabel'>Advanced Lessons</div>
                            <p></p>
                    </div>}
                </div>
                <div className='serviceLabel' onClick={() => setCompetitionPackages(!competitionPackages)}>
                    {competitionPackages ? downCaret : rightCaret} Competition Packages
                    {competitionPackages && <div>
                        <div className='serviceLabel'>Beginner Lessons
                            <p></p>
                        </div>
                            <p></p>
                        <div className='serviceLabel'>Intermediate Lessons</div>
                            <p></p>
                        <div className='serviceLabel'>Advanced Lessons</div>
                            <p></p>
                    </div>}
                </div>
            </div>
        </div>
    );
}

export default Services;