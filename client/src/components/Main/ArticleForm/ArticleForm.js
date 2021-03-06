import './ArticleForm.css';

import { Form } from 'formik';
import { MyTextInput, MyTextareaInput, MySelect } from '../../../reusable-components/reusable-components.js';
import availableOptions from '../../../utils/categoryOptions.js';

import ErrorMessage from '../ErrorMessage/ErrorMessage.js';

const ArticleForm = ({
    setFieldValue,
    imageUrl,
    onDeleteImageHandler,
    onSubmitError,
}) => {
    return (
        <Form className="article-form">
            <MyTextInput
                label="Title:"
                name="title"
                type="text"
                placeholder="Title.."
            />

            <MyTextareaInput
                label="Content:"
                name="content"
                placeholder="Description.."
            />

            <MySelect label="Category:" name="category">
                {availableOptions.map(o => {
                    return <option key={o.value} value={o.value}>{o.label}</option>
                })}
            </MySelect>

            <label htmlFor="image">{imageUrl ? 'Change your image:' : 'Upload an image (optional):'}</label>
            {
                imageUrl && (
                    <>
                        <img src={imageUrl} alt="" />
                        <div className="delete-image">
                            <span onClick={onDeleteImageHandler} className="delete-image-btn">[Delete your image]</span>
                        </div>
                    </>
                )
            }
            <input id="image" name="image" type="file" onChange={(event) => {
                setFieldValue("image", event.currentTarget.files[0]);
            }} />

            <MyTextInput
                label="Youtube URL (optional):"
                name="youtubeUrl"
                type="text"
                placeholder="https://"
            />

            {onSubmitError.message.length > 0 && <ErrorMessage message={onSubmitError.message} />}

            <input type="submit" value="Submit" />
        </Form>
    );
}

export default ArticleForm;