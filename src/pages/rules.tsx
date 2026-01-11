import { ChangeEvent, useEffect, useState } from 'react';
import {
  Card,
  Accordion,
  AccordionItem,
  Button,
  Link,
  Tooltip,
} from '@heroui/react';
import { useDebouncedValue } from '@hooks/use-debounced-value';
import { ExpandAllIcon, CollapseAllIcon } from '@components/icons';
import { title } from '@components/primitives';
import { MarkdownText } from '@components/common/markdown-text';
import { SearchInput } from '@components/common/search-input';
import { splitMarkdown, MarkdownSection } from '@utils/split-markdown';
import { parseFrontMatter } from '@utils/parse-front-matter';
import { FullScreenLoader } from '@components/common/fullscreen-loader';

export const RulesPage = () => {
  const [sections, setSections] = useState<MarkdownSection[]>([]);
  const [meta, setMeta] = useState<Record<string, string>>();
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set(['1']));
  const [searchQuery, setSearchQuery] = useState('');

  const lang = 'en';
  const url = `/content/rules/${lang}.md`;
  const debouncedQuery = useDebouncedValue(searchQuery, 20);

  useEffect(() => {
    const controller = new AbortController();

    const loadMarkdown = async () => {
      const res = await fetch(url, { signal: controller.signal });

      if (!res.ok) throw new Error(`Failed to load ${url} (${res.status})`);
      const text = await res.text();

      if (!text) throw new Error(`Failed to process markdown`);

      const sections = splitMarkdown(text, 2);
      const allKeys = new Set(sections.map((_, index) => String(index)));

      setMeta(parseFrontMatter(text).meta);
      setSelectedKeys(allKeys);
      setSections(sections);
    };

    loadMarkdown();
  }, [lang]);

  useEffect(() => {
    if (!debouncedQuery) {
      setSelectedKeys(new Set(sections.map((_, index) => String(index))));

      return;
    }

    const matchedKeys = new Set<string>();

    sections.forEach((section, index) => {
      if (section.content.toLowerCase().includes(debouncedQuery)) {
        matchedKeys.add(String(index));
      }
    });

    setSelectedKeys(matchedKeys);
  }, [debouncedQuery, sections]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleToggleAll = () => {
    if (sections.length === 0) return;

    const allKeys = new Set(sections.map((_, index) => String(index)));

    if (selectedKeys.size === sections.length) setSelectedKeys(new Set());
    else setSelectedKeys(allKeys);
  };

  const ToggleAllButton = () => {
    const allSelected = selectedKeys.size === sections.length;

    return (
      <Tooltip
        showArrow
        closeDelay={50}
        content={allSelected ? 'Collapse all' : 'Expand all'}
      >
        <Button
          isIconOnly
          className="w-fit text-md"
          variant="flat"
          onPress={handleToggleAll}
        >
          {allSelected ? <CollapseAllIcon /> : <ExpandAllIcon />}
        </Button>
      </Tooltip>
    );
  };

  return sections.length === 0 ? (
    <FullScreenLoader />
  ) : (
    <section className="flex flex-col items-left justify-center gap-4 sm:py-8 w-full">
      <div className="inline-block w-full text-left justify-center">
        <h1 className={title()}>Rules</h1>

        {meta?.last_update && (
          <p className="text-sm mt-1 text-default-500">
            Last updated:{' '}
            {new Date(meta.last_update).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        )}

        <Card className="p-3 mt-6 w-full flex flex-col gap-3 items-center">
          <div className="flex justify-between w-full gap-3">
            <SearchInput onChange={handleSearch} />
            <ToggleAllButton />
          </div>
          <Accordion
            selectedKeys={selectedKeys}
            selectionMode="multiple"
            variant="shadow"
            onSelectionChange={(keys) => {
              if (keys === 'all') return;
              setSelectedKeys(new Set([...keys].map(String)));
            }}
          >
            {sections.map((section, index) => (
              <AccordionItem key={index} title={section.title}>
                <MarkdownText
                  content={section.content}
                  searchQuery={debouncedQuery}
                />
              </AccordionItem>
            ))}
          </Accordion>
          <Link
            isExternal
            showAnchorIcon
            className="w-fit text-default-600 text-xs"
            href={`https://github.com/shdewz/3wc-web/tree/main/public${url}`}
            size="sm"
          >
            View source
          </Link>
        </Card>
      </div>
    </section>
  );
};
