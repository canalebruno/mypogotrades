import { Button, Icon, Tooltip } from '@chakra-ui/react';
import { useState } from 'react';
import { FiCopy } from 'react-icons/fi';
import { GoCheck } from 'react-icons/go';

interface CopyButtonProps {
  label: string;
  onClickFunction: (e) => void;
}

export function CopyButton({ onClickFunction, label }: CopyButtonProps) {
  const [wasClicked, setWasClicked] = useState(false);

  function handleClicked() {
    setWasClicked(true);
    setTimeout(() => setWasClicked(false), 1000);
  }

  function handleCopyDone(e) {
    handleClicked();
    onClickFunction(e);
    console.log(e);
  }

  return (
    <Tooltip label={label} placement="right" hasArrow gutter={16}>
      <span>
        <Button
          lineHeight="base"
          variant="unstyled"
          borderRadius="50%"
          bg={wasClicked ? 'green.500' : 'white'}
          onClick={(e) => handleCopyDone(e)}
        >
          <Icon
            as={wasClicked ? GoCheck : FiCopy}
            color={wasClicked ? 'white' : 'gray.800'}
          />
        </Button>
      </span>
    </Tooltip>
  );
}
