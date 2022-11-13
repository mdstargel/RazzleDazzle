import React, { useState } from 'react';
import './styles.css'
import PageTitle from "./PageTitle";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";

const Services = () => {
    const [individualLessonPackages, setIndividualLessonPackages] = useState(false);
    const [groupLessonPackages, setGroupLessonPackages] = useState(false);
    const [ridingStylePackages, setRidingStylePackages] = useState(false);
    const [competitionPackages, setCompetitionPackages] = useState(false);
    
    const rightCaret = (
        <span><IoIosArrowForward /></span>
    );
    const downCaret = (
        <span><IoIosArrowDown /></span>
    );
    return (
        // Need to reinsert on line 22 (original stuff: <div style={{ marginTop: '400px' }}>)
        <div className='backGround'>
            <PageTitle name="Services" />
            
            <div className='form2Alt'> 
                <div className='serviceLabel' onClick={() => setIndividualLessonPackages(!individualLessonPackages)}>
                    {individualLessonPackages ? 
                    <div className='carrotCenter'>{downCaret} <div style={{marginTop: '-2px', marginLeft: '2px'}}>Individual Lesson Packages</div></div>  
                    : <div className='carrotCenter'>{rightCaret} <div style={{marginTop: '-2px', marginLeft: '2px'}}>Individual Lesson Packages</div></div>} 
                </div>
                {individualLessonPackages && <div className='servicelabelsub'>
                    <div style={{fontWeight: 'bold', fontSize: '22px'}}>Beginner Lessons
                        <ul className='listText'>
                            <li>Assisted Horse Equipment (saddle, stirrups, bridle, halter, reins, bits, and harness) </li>
                            <li>Assisted Horse Grooming </li>
                            <li>Assisted mount/dismount  </li>
                            <li>Assisted Walk, trot, canter, and gallop  </li>
                            <li>Short-distance trail riding</li>
                        </ul>
                    </div>
                    <div style={{fontWeight: 'bold', fontSize: '22px'}}>Intermediate Lessons
                        <ul className='listText'>
                            <li>Assisted Horse Equipment </li>
                            <li>Assisted Horse Grooming </li>
                            <li>Assisted mount/dismount </li>
                            <li>Assisted Walk, trot, canter, and gallop  </li>
                            <li>Moderate-distance trail riding</li>
                            <li>Technique Riding </li>
                        </ul>
                    </div>
                    <div style={{fontWeight: 'bold', fontSize: '22px'}}>Advanced Lessons
                        <ul className='listText'>
                            <li>Unassisted Horse Equipment </li>
                            <li>Unassisted Horse Grooming  </li>
                            <li>Unassisted mount/dismount   </li>
                            <li>Walk, trot, canter, and gallop    </li>
                            <li>Long-distance trail riding  </li>
                            <li>Advanced Technique Riding  </li>
                        </ul>
                    </div>
                </div>}
                <div className='serviceLabel' onClick={() => setGroupLessonPackages(!groupLessonPackages)}>
                    {groupLessonPackages ? 
                    <div className='carrotCenter'>{downCaret} <div style={{marginTop: '-2px', marginLeft: '2px'}}>Group Lesson Packages</div></div> 
                    : <div className='carrotCenter'>{rightCaret} <div style={{marginTop: '-2px', marginLeft: '2px'}}>Group Lesson Packages</div></div>} 
                    
                </div>
                {groupLessonPackages && <div className='servicelabelsub'>
                    <div style={{fontWeight: 'bold', fontSize: '22px'}}>Beginner Lessons
                        <ul className='listText'>
                            <li>Assisted Horse Equipment (saddle, stirrups, bridle, halter, reins, bits, and harness) </li>
                            <li>Assisted Horse Grooming </li>
                            <li>Assisted mount/dismount  </li>
                            <li>Assisted Walk, trot, canter, and gallop  </li>
                            <li>Short-distance trail riding</li>
                        </ul>
                    </div>
                    <div style={{fontWeight: 'bold', fontSize: '22px'}}>Intermediate Lessons
                        <ul className='listText'>
                            <li>Assisted Horse Equipment </li>
                            <li>Assisted Horse Grooming </li>
                            <li>Assisted mount/dismount </li>
                            <li>Assisted Walk, trot, canter, and gallop  </li>
                            <li>Moderate-distance trail riding</li>
                            <li>Technique Riding </li>
                        </ul>
                    </div>
                    <div style={{fontWeight: 'bold', fontSize: '22px'}}>Advanced Lessons
                        <ul className='listText'>
                            <li>Unassisted Horse Equipment </li>
                            <li>Unassisted Horse Grooming  </li>
                            <li>Unassisted mount/dismount   </li>
                            <li>Walk, trot, canter, and gallop    </li>
                            <li>Long-distance trail riding  </li>
                            <li>Advanced Technique Riding  </li>
                        </ul>
                    </div>
                </div>}
                <div className='serviceLabel' onClick={() => setRidingStylePackages(!ridingStylePackages)}>
                    {ridingStylePackages ? 
                    <div className='carrotCenter'>{downCaret} <div style={{marginTop: '-2px', marginLeft: '2px'}}>Riding Style Packages</div></div> 
                    : <div className='carrotCenter'>{rightCaret} <div style={{marginTop: '-2px', marginLeft: '2px'}}>Riding Style Packages</div></div>} 
                </div>
                {ridingStylePackages && <div className='servicelabelsub'>
                    <div style={{fontWeight: 'bold', fontSize: '22px'}}>English Riding Style
                        <ul className='listText'>
                            <li>English Saddle Equipment (saddle, stirrups, bridle, halter, reins, bits, and harness) </li>
                            <li>Dressage </li>
                            <li>Show Jumping </li>
                            <li>Hunters </li>
                            <li>Cross Country </li>
                        </ul>
                    </div>
                    <div style={{fontWeight: 'bold', fontSize: '22px'}}>Western Riding Style
                        <ul className='listText'>
                            <li>Western Saddle Equipment (saddle, stirrups, bridle, halter, reins, bits, and harness) </li>
                            <li>Pole Bending </li>
                            <li>Barrel Racing </li>
                            <li>Stake Race </li>
                        </ul>
                    </div>
                </div>}
                <div className='serviceLabel' onClick={() => setCompetitionPackages(!competitionPackages)}>
                    {competitionPackages ? 
                    <div className='carrotCenter'>{downCaret} <div style={{marginTop: '-2px', marginLeft: '2px'}}>Competition Packages</div></div> 
                    : <div className='carrotCenter'>{rightCaret} <div style={{marginTop: '-2px', marginLeft: '2px'}}>Competition Packages</div></div>} 
                </div>
                {competitionPackages && <div className='servicelabelsub'>
                    <div style={{fontWeight: 'bold', fontSize: '22px'}}> Competitive English Riding
                        <ul className='listText'>
                            <li>English Saddle Equipment (saddle, stirrups, bridle, halter, reins, bits, and harness) </li>
                            <li>Dressage </li>
                            <li>Show Jumping </li>
                            <li>Hunters </li>
                            <li>Cross Country </li>
                            <li>English Showmanship </li>
                        </ul>
                    </div>
                    <div style={{fontWeight: 'bold', fontSize: '22px'}}>Competitive Western Riding
                        <ul className='listText'>
                            <li>Reining </li>
                            <li>Cutting </li>
                            <li>Pole Bending </li>
                            <li>Team Penning </li>
                            <li>Barrel Racing </li>
                            <li>Stake Race </li>
                            <li>Western Showmanship </li>
                            <li>Roping </li>
                        </ul>
                    </div>
                </div>}
            </div>
        </div>
    );
}

export default Services;