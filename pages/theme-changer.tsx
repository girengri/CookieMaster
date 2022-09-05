import { ChangeEvent, FC, useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import {
    Button,
    Card,
    CardContent,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
} from "@mui/material";

import Cookies from "js-cookie";
import axios from "axios";

import { Layout } from "../components/layouts";

interface Props {
    theme: string;
}

const ThemeChangerPage: FC<Props> = ({ theme }) => {
    // console.log({ props });

    const [currentTheme, setCurrentTheme] = useState(theme);

    const onThemeChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCurrentTheme(event.target.value);

        Cookies.set("theme", event.target.value);
    };

    const onClick = async () => {
        const { data } = await axios.get("/api/hello");

        console.log({ data });
    };

    useEffect(() => {
        console.log("Cookies:", Cookies.get("theme"));
    }, []);

    return (
        <Layout>
            <Card>
                <CardContent>
                    <FormControl>
                        <FormLabel>Tema</FormLabel>
                        <RadioGroup value={currentTheme} onChange={onThemeChange}>
                            <FormControlLabel
                                value="light"
                                control={<Radio />}
                                label="Light"
                            />
                            <FormControlLabel value="dark" control={<Radio />} label="Dark" />
                            <FormControlLabel
                                value="custom"
                                control={<Radio />}
                                label="Custom"
                            />
                        </RadioGroup>
                    </FormControl>

                    <Button onClick={onClick}>Solicitud</Button>
                </CardContent>
            </Card>
        </Layout>
    );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const { theme = "light", name = "No name" } = req.cookies;
    const validThemes = ["light", "dark", "custom"];

    return {
        props: {
            theme: validThemes.includes(theme) ? theme : "light",
            name,
        },
    };
};

export default ThemeChangerPage;
