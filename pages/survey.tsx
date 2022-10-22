import { useState } from 'react'
import { Logo } from '../components/logo';
import { ProgressBar } from '../components/progressbar';
import { BASE_URL } from '../config';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReactStars from 'react-stars'
import styles from '../styles/Survey.module.css';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import Head from 'next/head'
import Image from 'next/image';


interface IWorkshop {
    id: number;
    workshop: string;
}
interface IForm {
    workshop: string;
    facultyNames: string;
    effectivePart: string;
    usefulIdea: string;
    changesSuggested: string;
    topicsForFuture: string;
    additionalComments: string;
}


interface ICategory {
    value: string;
    label: string;
}


const Survey = ({ workshops }: { workshops: IWorkshop[] }) => {
    const [percentage, setPercentage] = useState(0);
    const [startDate, setStartDate] = useState(new Date());
    const { register, control, handleSubmit, getValues } = useForm<IForm>();
    const [rating, setRating] = useState(5);

    const workShopOptions: ICategory[] = workshops.map(x => ({ value: x.workshop, label: x.workshop }))

    const submitForm = (data: IForm) => {
        console.table({ startDate, rating, ...data })
    }

    const SurveyItemList = ({ percentage }: { percentage: number }) => {
        switch (percentage) {
            case 0:
                return (<>
                    <img className={styles.img} src="/hi-mascot.png" alt="moose mascot saying hi" />
                    <p className={styles.img} >Please help us design future effective workshops, by providing valuable feedback about the session you attended.</p>
                </>)
            case 10:
                return (<>
                    <label htmlFor="workshop">Please select the name of the workshop from the list below:</label>
                    <Controller
                        control={control}
                        defaultValue={workshops[0].workshop}
                        render={({ field: { onChange, value, name, ref } }) => {
                            const currentSelection = workShopOptions.find(
                                (c) => c.value === value
                            );
                            const handleSelectChange = (selectedOption: ICategory | null) => {
                                onChange(selectedOption?.value);
                            };

                            return (
                                <Select
                                    id="long-value-select"
                                    instanceId="long-value-select" value={currentSelection}
                                    name={name}
                                    options={workShopOptions}
                                    onChange={handleSelectChange}
                                />
                            );
                        }}
                        name="workshop"
                        rules={{ required: true }}
                    />
                </>)
            case 20:
                return (<>
                    <label htmlFor="datetime">Select the date when you attended the workshop:</label>
                    <DatePicker className={styles.input} id="datetime" selected={startDate} onChange={(date: Date) => setStartDate(date)} />
                </>)
            case 30:
                return (<>
                    < label htmlFor="rating" > How would you rate the session:</label >
                    <ReactStars key="rating" className={styles.input} count={7} value={rating} onChange={(val: number) => setRating(val)} size={24} color2={'#ffd700'} />
                </>)
            case 40:
                return (<>
                    < label htmlFor="name" > Facilator(s) name for session:</label >
                    <input type="text" className={styles.input} id="name" {...register("facultyNames")} />
                </>)
            case 50:
                return (<>
                    < label htmlFor="usefulIdea" > What is one idea or practice from this workshop that you will use?</label >
                    <input type="text" className={styles.input} id="usefulIdea" {...register("usefulIdea")} />
                </>)
            case 60:
                return (<>
                    < label htmlFor="effectivePart" >What changes would make this workshop more effective?</label >
                    <input type="text" className={styles.input} id="effectivePart" {...register("effectivePart")} size={250} />
                </>)
            case 70:
                return (<>
                    < label htmlFor="topicsForFuture" >Do you have any additional topics that you would like to see in future workshops? (While we can&apos;t promise we can offer everything suggested, it will help us define demand for a particular area).
                    </label >
                    <input type="text" className={styles.input} id="topicsForFuture" {...register("topicsForFuture")} size={250} />
                </>)
            case 80:
                return (<>
                    < label htmlFor="additionalComments" > Additional Comments?</label >
                    <input type="text" className={styles.input} id="additionalComments" {...register("additionalComments")} size={250} />
                </>)
            case 90:
                setTimeout(() => { setPercentage(100) }, 2000)
                return (<>
                    <p>Please wait while we send your feedback.</p>
                </>)
            default:
                return (<>
                    <img className={styles.img} src="/thankyou-mascot.png" alt="moose saying thankyou" />
                    <p>We appreciate the time you took to provide us with feedback.  We can continue to develop high-quality experiences using your suggestions.</p>
                    <p> If you are interested in further development with teaching and learning and utilizing Brightspace, please visit:</p>
                    <a className={styles.a} href="https://ctl2.uwindsor.ca/workshops/145/">https://ctl2.uwindsor.ca/workshops/145/</a>.
                </>)
        }
    }


    return (<div>
        <Head>
            <title>Survey</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <main >
            <ProgressBar percentage={percentage} />
            <Logo />
            <div className={styles.container} >
                <div className={styles.item}>
                    <SurveyItemList percentage={percentage} />
                </div>
            </div>
            <section className={styles.section}>
                <button className={styles.button} onClick={() => setPercentage(percentage - 10)} disabled={percentage === 0 || percentage === 100}>back</button>
                <button className={styles.button} onClick={() => setPercentage(percentage + 10)} disabled={percentage > 80}>front</button>
            </section>
        </main>
    </div>)
}

export async function getStaticProps() {
    const res = await fetch(BASE_URL + "/api/workshops");
    const workshops = await res.json();
    return {
        props: workshops
    }
}
export default Survey;