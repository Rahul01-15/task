import React, { useState } from "react";
import defaultUser from "./../../assets/images/default-user.png";
import Avatar from "antd/lib/avatar/avatar";
import "./Comments.scss";
import moment from "moment";
import { EditTwoTone, DeleteTwoTone } from "@ant-design/icons";
import { Form as FinalForm, Field } from "react-final-form";
import { Form, Input, Button, Alert } from "antd";

export default function CommentsMobile({
  comment,
  index,
  userState,
  setDeleteModal,
  selectedEditCommentID,
  setDeleteSelectedCommentID,
  setEditSelectedCommentID,
  onSubmit,
}) {
  const [initialValues, setInitialValues] = useState({});
  const [submissionErrors, setSubmissionErrors] = useState(null);
  return (
    <div className="comment-container full-width-comment" key={index}>
      <div>
        <Avatar size="large" src={comment.createdBy.imagePath ?? defaultUser} />
      </div>
      <div className="full-width-comment">
        <div className="comment-text-mobile">
          <b>{comment.createdBy.userName}</b>
          <div className="comment-date-mobile">
            {moment(comment.createdAt).fromNow(false)}
          </div>
          <div>
            {comment._id === selectedEditCommentID ? (
              <FinalForm
                initialValues={initialValues}
                onSubmit={onSubmit}
                render={({ form, handleSubmit, submitting, reset }) => (
                  <form
                    className="comment-editing"
                    onSubmit={async (event) => {
                      await handleSubmit(event);
                      form.reset();
                    }}
                  >
                    <Form.Item labelCol={{ span: 24 }}>
                      <Field name="content">
                        {({ input, meta }) => (
                          <div>
                            <Input {...input} name="content" />
                          </div>
                        )}
                      </Field>
                    </Form.Item>

                    {submissionErrors && (
                      <Alert
                        message={submissionErrors}
                        type="error"
                        showIcon
                        closable
                      />
                    )}

                    <div className="comments-btns-container">
                      <Button
                        disabled={submitting}
                        htmlType="submit"
                        type="primary"
                      >
                        Update Comment
                      </Button>
                      <Button
                        disabled={submitting}
                        htmlType="button"
                        onClick={() => setEditSelectedCommentID(null)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                )}
              />
            ) : (
              comment.content
            )}
          </div>
        </div>

        {comment._id !== selectedEditCommentID && (
          <>
            {comment.createdBy._id === userState.user.id && (
              <div className="icons-cols-mobile">
                <EditTwoTone
                  key="edit"
                  onClick={() => {
                    setEditSelectedCommentID(comment._id);
                    setInitialValues({ ...comment });
                  }}
                />
                <DeleteTwoTone
                  key="delete"
                  twoToneColor="red"
                  onClick={() => {
                    setDeleteSelectedCommentID(comment._id);
                    setDeleteModal(true);
                  }}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
