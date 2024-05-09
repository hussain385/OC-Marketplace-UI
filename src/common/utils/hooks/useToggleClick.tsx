import React, { useCallback, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useToggleClick(reset?: any) {
  // Add these variables to your component to track the state
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setShowConfirmPassword] = React.useState(false);

  const [toggle, setToggle] = React.useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
    reset();
  };

  const handleClickShowPassword = useCallback(() => setShowPassword((prevState) => !prevState), []);

  const handleMouseDownPassword = () => handleClickShowPassword();

  const handleClickConfirmPassword = useCallback(() => setShowConfirmPassword(!confirmPassword), [confirmPassword]);

  const handleMouseDownConfirmPassword = useCallback(
    () => setShowConfirmPassword(!confirmPassword),
    [setShowConfirmPassword, confirmPassword],
  );

  const obj = {
    showPassword,
    confirmPassword,
    handleClickShowPassword,
    handleMouseDownPassword,
    handleClickConfirmPassword,
    handleMouseDownConfirmPassword,
    handleToggle,
    toggle,
  };

  return obj;
}

export default useToggleClick;
