import React, { Fragment, useState } from "react";
import BottomButtons from "../../../../../../../../ReusableComponents/BottomButtons";
import Button from "antd/es/button/button";
import Drawer from "antd/es/drawer";
import Input from "antd/es/input/Input";
import FormItem from "antd/es/form/FormItem";
import message from "antd/es/message";
import TextWithInfo from "../../../../../../../../ReusableComponents/TextWithInfo";
import ISO6391 from "iso-639-1";
import TranslatedText from "../../../../../../../../translations/TranslatedText";

const { getNativeName } = ISO6391;

export default ({ onAdd, languagesList, existingOptions }: any) => {
  const [drawerVisibility, setDrawerVisibility] = useState(false);
  const [newOption, setNewOption] = useState({ text: {} } as any);

  // opens drawer when add button is clicked
  function openDrawer() {
    setDrawerVisibility(true);
  }

  // close drawer
  function closeDrawer() {
    setDrawerVisibility(false);
  }

  // on change input value | text
  function onChangeInput(
    e: React.ChangeEvent<HTMLInputElement>,
    text?: string
  ) {
    const tempNewOption = { ...newOption };

    if (text) {
      tempNewOption["text"][text] = e.target.value;
    } else {
      tempNewOption["value"] = e.target.value;
    }
    setNewOption(tempNewOption);
  }

  // save new added option
  function onSaveOption() {
    const newOptionValue = newOption["value"];
    const newOptionListText = Object.values(newOption["text"]);

    // check if value already exists (iterates over existing options)
    for (let index = 0; index < existingOptions.length; index++) {
      const currentOptionValue = existingOptions[index]["value"];
      if (newOptionValue === currentOptionValue) {
        // error message for already existing value (values must be unique by question)
        return message.error("Утга давхцаж байна");
      }
    }

    if (newOptionListText.length === languagesList.length) {
      // sends new option back with text(on each language) and value
      onAdd(newOption);
      // closes this drawer
      closeDrawer();
    } else {
      // error message for required languages
      message.error("Бүх талбарыг бөглөх шаардлагатай");
    }
  }

  return (
    <Fragment>
      <Button icon="plus" onClick={openDrawer}>
        <TranslatedText id="btn.add" />
      </Button>
      <Drawer
        title="Шинэ сонголт нэмэх"
        width={150}
        onClose={closeDrawer}
        visible={drawerVisibility}
        destroyOnClose
      >
        <FormItem label="Сонголтын нэр">
          <Input onChange={e => onChangeInput(e, "en")} />
        </FormItem>

        <FormItem label="Value">
          <Input onChange={onChangeInput} />
        </FormItem>
        <BottomButtons onClose={closeDrawer} onSubmit={onSaveOption} />
      </Drawer>
    </Fragment>
  );
};
