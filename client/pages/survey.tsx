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

interface IFaculty {
    id: number;
    faculty: string;
}
interface IForm {
    workshop: string;
    faculty: string;
    useful_idea: string;
    changes_suggested: string;
    topics_for_future: string;
    additional_comments : string;
}


interface ICategory {
    value: string;
    label: string;
}

interface IProp {
    workshops: IWorkshop[],
    facultys: IFaculty[]
}

const Survey = ({ workshops, facultys }: IProp) => {
    const [percentage, setPercentage] = useState(0);
    const [startDate, setStartDate] = useState(new Date());
    const { register, control, handleSubmit } = useForm<IForm>();
    const [rating, setRating] = useState(5);

    const workShopOptions: ICategory[] = workshops.map(x => ({ value: x.id.toString(), label: x.workshop }))
    const facultyOptions: ICategory[] = facultys.map(x => ({ value: x.id.toString(), label: x.faculty }))

    const submitForm = async (data: IForm) => {
        const res = await fetch(BASE_URL + "/feedback/", {
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify({ date: startDate, rating, ...data }),
        })
        if (res.status == 201)
            setPercentage(100);
        else
            setPercentage(99);
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
                        defaultValue={workshops[0].id.toString()}
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
                                    options={facultyOptions}
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
                    <Controller
                        control={control}
                        defaultValue={facultys[0].id.toString()}
                        render={({ field: { onChange, value, name, ref } }) => {
                            const currentSelection = facultyOptions.find(
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
                        name="faculty"
                        rules={{ required: true }}
                    />
                </>)
            case 50:
                return (<>
                    < label htmlFor="usefulIdea" > What is one idea or practice from this workshop that you will use?</label >
                    <input type="text" className={styles.input} id="usefulIdea" {...register("useful_idea")} />
                </>)
            case 60:
                return (<>
                    < label htmlFor="effectivePart" >What changes would make this workshop more effective?</label >
                    <input type="text" className={styles.input} id="changesSuggested" {...register("changes_suggested")} size={250} />
                </>)
            case 70:
                return (<>
                    < label htmlFor="topicsForFuture" >Do you have any additional topics that you would like to see in future workshops? (While we can&apos;t promise we can offer everything suggested, it will help us define demand for a particular area).
                    </label >
                    <input type="text" className={styles.input} id="topicsForFuture" {...register("topics_for_future")} size={250} />
                </>)
            case 80:
                return (<>
                    < label htmlFor="additionalComments" > Additional Comments?</label >
                    <input type="text" className={styles.input} id="additionalComments" {...register("additional_comments")} size={250} />
                </>)
            case 90:
                handleSubmit(submitForm)()
                return (<>
                    <p>Please wait while we send your feedback.</p>
                </>)
            case 99:
                return (<>
                    <img className={styles.img} src="/wtf-mascot.png" alt="moose mascot feeling wtf" />
                    <p>We are facing unknown issue at the moment.</p>
                    <p>Please try again after some time.</p>
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
                <button className={styles.button} onClick={() => setPercentage(percentage - 10)} disabled={percentage === 0 || percentage > 100}>back</button>
                <button className={styles.button} onClick={() => setPercentage(percentage + 10)} disabled={percentage > 80}>front</button>
            </section>
        </main>
    </div>)
}

export async function getStaticProps() {
    const res = [
        await fetch(BASE_URL + "/workshop"),
        await fetch(BASE_URL + "/faculty")
    ]
    return {
        props: {
            workshops: await res[0].json(),
            facultys: await res[1].json(),
        }
    }

}

export default Survey;