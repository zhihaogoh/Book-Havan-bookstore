import { Fragment, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import {
  FiCheckCircle,
  FiEye,
  FiEyeOff,
  FiKey,
  FiLock,
  FiSave,
} from "react-icons/fi";
import { useNavigate } from "react-router";

export default function ChangePasswordForm() {
  const navigate = useNavigate();
  // 保存三个输入框的密码；初始值都是空字符串
  const [passwords, setPasswords] = useState({
    current: "",
    next: "",
    confirm: "",
  });
  // 保存各输入框是否显示明文
  // 初始为 {}，visible.current 等属性是 undefined，判断时相当于 false
  const [visible, setVisible] = useState({});
  // 保存页面提示信息；空字符串表示暂时没有提示
  const [message, setMessage] = useState("");

  // 估算新密码强度：检查长度和字符组合，不是验证字体
  const score = [
    passwords.next.length >= 8,
    passwords.next.length >= 12,
    // 同时包含小写字母和大写字母，得 1 分
    /[a-z]/.test(passwords.next) && /[A-Z]/.test(passwords.next), // 包含数字，得 1 分
    /\d/.test(passwords.next),
    /[a-zA-Z0-9]/.test(passwords.next),
    // 包含非英文字母、非数字的字符，得 1 分
    // 注意：[] 内开头的 ^ 表示“不是这些字符”
  ].filter(Boolean).length;
  const strength = !passwords.next
    ? "None"
    : score < 3
      ? "Weak"
      : score < 5
        ? "Medium"
        : "Strong";

  const fields = [
    {
      id: 1,
      name: "current",
      label: "Current Password",
      placeholder: "Enter current password",
      Icon: FiLock,
    },
    {
      id: 2,
      name: "next",
      label: "New Password",
      placeholder: "Enter new password",
      Icon: FiKey,
    },
    {
      id: 3,
      name: "confirm",
      label: "Confirm New Password",
      placeholder: "Confirm new password",
      Icon: FiCheckCircle,
    },
  ];
  return (
    <>
      <div className="change_password">
        <div className="title">
          <h3>Change Password</h3>
          <span>
            Ensure your account is using a long, random password to stay secure.
          </span>
        </div>
        <Card className="my-3">
          <Form className="password-card">
            {fields.map((item, index) => (
              <>
                <Fragment key={index}>
                  <Form.Label column sm={12}>
                    {item.label}
                  </Form.Label>
                  <Form.Group className="group_input">
                    <item.Icon className="icon" aria-hidden="true" />

                    <Form.Control
                      id={`password-${item.name}`}
                      className={
                        item.name === "current"
                          ? "current_password"
                          : item.name === "next"
                            ? "new_password"
                            : "confrim_password"
                      }
                      type={visible[item.name] ? "text" : "password"}
                      autoComplete={
                        item.name === "current"
                          ? "current-password"
                          : "new-password"
                      }
                      placeholder={item.placeholder}
                      value={passwords[item.name]}
                      minLength={item.name === "current" ? undefined : 8}
                      aria-describedby={
                        item.name === "next"
                          ? "password-hint password-strength"
                          : undefined
                      }
                      onChange={(event) => {
                        // event.target.value 是用户输入的密码字符串
                        const value = event.target.value;
                        // 更新当前密码字段，同时保留其他字段的值
                        setPasswords((prev) => ({
                          ...prev,
                          [item.name]: value,
                        }));
                        setMessage("");
                      }}
                      required
                    />

                    <Button
                      type="button"
                      className="password-visibility"
                      aria-label={`${visible[item.name] ? "Hide" : "Show"} ${item.label.toLowerCase()}`}
                      aria-pressed={Boolean(visible[item.name])}
                      onClick={() =>
                        setVisible({
                          ...visible,
                          [item.name]: !visible[item.name],
                        })
                      }
                    >
                      {visible[item.name] ? (
                        <FiEye aria-hidden="true" />
                      ) : (
                        <FiEyeOff aria-hidden="true" />
                      )}
                    </Button>
                  </Form.Group>
                  {item.name === "next" && (
                    <div
                      className="password-strength"
                      data-strength={strength.toLowerCase()}
                    >
                      <span id="password-strength">
                        Password Strength: {strength}
                      </span>
                      <div
                        className="password-strength-track"
                        aria-hidden="true"
                      >
                        <div
                          style={{
                            width: `${passwords.next ? Math.max(score, 1) * 20 : 0}%`,
                          }}
                        />
                      </div>
                      <p id="password-hint">
                        Use 8 or more characters with a mix of letters, numbers
                        &amp; symbols.
                      </p>
                    </div>
                  )}
                </Fragment>
              </>
            ))}
            {message && (
              <p className="password-message" role="status">
                {message}
              </p>
            )}
            <div className="password-actions">
              <Button
                type="button"
                className="password-cancel"
                onClick={() => navigate("/profile")}
              >
                Cancel
              </Button>
              <Button type="submit" className="password-save">
                <FiSave aria-hidden="true" />
                Save Changes
              </Button>
            </div>
          </Form>
        </Card>
      </div>
    </>
  );
}
