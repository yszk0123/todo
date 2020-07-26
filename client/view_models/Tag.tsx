import {
  RootTagFragment,
  TagParentFragment,
} from '../tag/graphql/__generated__/Tag.graphql';

export type TagGroup = {
  header: { name: string | null };
  parent: TagParentFragment | null;
  tags: RootTagFragment[];
};

function compareTag(
  a: TagParentFragment | null | undefined,
  b: TagParentFragment | null | undefined
): number {
  if (!b) return !a ? 0 : 1;
  if (!a) return -1;
  return a.name.localeCompare(b.name);
}

function sortTagsByContent(tags: RootTagFragment[]): RootTagFragment[] {
  return [...tags].sort((a, b) => {
    const name = a.name.localeCompare(b.name);
    if (name !== 0) return name;
    return compareTag(a.parent, b.parent);
  });
}

export function groupTagByParent(tags: RootTagFragment[]): TagGroup[] {
  const groupsById: Record<string, TagGroup> = {};

  sortTagsByContent(tags).forEach((tag) => {
    const key = tag.parent?.id ?? '__DEFAULT__';
    let group = groupsById[key];
    if (!group) {
      const name = tag.parent?.name ?? null;
      group = {
        header: { name },
        tags: [],
        parent: tag.parent ?? null,
      };
    }
    group.tags.push(tag);
    groupsById[key] = group;
  });

  const tagGroups = Object.values(groupsById).sort((a, b) => {
    if (!b.header.name) return !a.header.name ? 0 : 1;
    if (!a.header.name) return -1;
    return a.header.name.localeCompare(b.header.name);
  });
  return tagGroups;
}
