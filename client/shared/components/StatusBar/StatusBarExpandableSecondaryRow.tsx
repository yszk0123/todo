import React from 'react';
import { MdChevronRight } from 'react-icons/md';
import { Flex } from 'rebass';

const VerticalExpansionIcon: React.FunctionComponent<{
  isExpanded: boolean;
}> = ({ isExpanded }) => {
  return (
    <Flex
      sx={{
        transform: isExpanded ? 'rotate(90deg)' : 'rotate(-90deg)',
        transition: 'transform 0.3s ease-out',
      }}
    >
      <MdChevronRight />
    </Flex>
  );
};

const StatusBarExpansionButton: React.FunctionComponent<{
  isExpanded: boolean;
  onClick: () => void;
}> = ({ isExpanded, onClick }) => {
  return (
    <Flex
      aria-label="toggle"
      justifyContent="center"
      mb={2}
      p={1}
      role="button"
      sx={{ ':hover': { cursor: 'pointer', bg: 'highlight' } }}
      tabIndex={0}
      onClick={onClick}
    >
      <VerticalExpansionIcon isExpanded={isExpanded} />
    </Flex>
  );
};

type Props = {
  isExpanded: boolean;
  onToggle: () => void;
};

export const StatusBarExpandableSecondaryRow: React.FunctionComponent<Props> = ({
  children,
  isExpanded,
  onToggle,
}) => {
  return (
    <Flex
      bg="background"
      color="gray"
      flexDirection="column"
      fontSize={2}
      pb={2}
    >
      <StatusBarExpansionButton isExpanded={isExpanded} onClick={onToggle} />
      <Flex
        flexDirection={isExpanded ? 'column' : undefined}
        flexWrap="wrap"
        justifyContent="space-between"
        px={2}
      >
        {children}
      </Flex>
    </Flex>
  );
};
