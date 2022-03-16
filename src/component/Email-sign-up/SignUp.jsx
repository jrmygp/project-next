import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Input,
} from "reactstrap";

const SignUp = () => {
  return (
    <div className="row mt-2">
      {/* step 1 */}
      <Card className="col-4 offset-4">
        <CardBody>
          <CardTitle className="d-flex justify-content-center align-items-center fw-bold">
            CREATE YOUR ACCOUNT
          </CardTitle>
          <CardSubtitle className="d-flex justify-content-center align-items-center text-muted">
            Email and Password verification
          </CardSubtitle>
          <Input placeholder="your_email@here.com" className="mt-3" type="email"></Input>
          <Input placeholder="Input password here" className="mt-2" type="password"></Input>
          <Input placeholder="Confirm password" className="mt-2" type="password"></Input>
          <Button className="mt-2" color="success">
            Next
          </Button>
        </CardBody>
      </Card>

      {/* step 2 */}
      <Card className="col-4 offset-4">
        <CardBody>
          <CardSubtitle className="d-flex justify-content-center align-items-center text-muted">
            User name authentication
          </CardSubtitle>
          <Input placeholder="Input first name here" className="mt-3"></Input>
          <Input placeholder="Input last name here" className="mt-2"></Input>
          <Input placeholder="Input display username here" className="mt-2"></Input>
          <Button className="mt-2" color="success">Next</Button>
        </CardBody>
      </Card>

      {/* Sign up success */}
      <Card className="col-4 offset-4">
      <CardBody>
          <CardTitle className="d-flex justify-content-center align-items-center">Sign Up Success</CardTitle>
          <CardSubtitle className="d-flex justify-content-center align-items-center">Welcome to DarkGram</CardSubtitle>
      </CardBody>
      </Card>

    </div>

  );
};

export default SignUp;
