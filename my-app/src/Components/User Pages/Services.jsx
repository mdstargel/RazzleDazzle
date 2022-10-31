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
                    
                </div>
                {individualLessonPackages && <div className='servicelabelsub'>
                    <div >Beginner Lessons
                        <p></p>
                    </div>
                        <p></p>
                    <div >Intermediate Lessons</div>
                        <p></p>
                    <div >Advanced Lessons</div>
                        <p></p>
                </div>}
                <div className='serviceLabel' onClick={() => setGroupLessonPackages(!groupLessonPackages)}>
                    {groupLessonPackages ? downCaret : rightCaret} Group Lesson Packages
                    
                </div>
                {groupLessonPackages && <div>
                        <div >Beginner Lessons
                            <p></p>
                        </div>
                            <p></p>
                        <div >Intermediate Lessons</div>
                            <p></p>
                        <div >Advanced Lessons</div>
                            <p></p>
                    </div>}
                <div className='serviceLabel' onClick={() => setRidingStylePackages(!ridingStylePackages)}>
                    {ridingStylePackages ? downCaret : rightCaret} Riding Style Packages
                </div>
                {ridingStylePackages && <div>
                        <div>Beginner Lessons
                            <p></p>
                        </div>
                            <p></p>
                        <div >Intermediate Lessons</div>
                            <p></p>
                        <div>Advanced Lessons</div>
                            <p></p>
                    </div>}
                <div className='serviceLabel' onClick={() => setCompetitionPackages(!competitionPackages)}>
                    {competitionPackages ? downCaret : rightCaret} Competition Packages
                </div>
                {competitionPackages && <div>
                        <div >Beginner Lessons
                            <p></p>
                        </div>
                            <p></p>
                        <div >Intermediate Lessons</div>
                            <p></p>
                        <div >Advanced Lessons</div>
                            <p></p>
                    </div>}
            </div>
        </div>
    );
}

export default Services;