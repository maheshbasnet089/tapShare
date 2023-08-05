const IsFormOrDiv = ({ children, isCodeWithIdPage, handleSubmit }) => {
  let content = isCodeWithIdPage ? (
    <div className="bg-[#22283C] mt-10 rounded-xl px-2">{children}</div>
  ) : (
    <div>
      <form
        onSubmit={handleSubmit}
        className="bg-[#22283C] mt-10 rounded-xl px-2"
      >
        {children}
      </form>
    </div>
  );
  return content;
};
export default IsFormOrDiv;
