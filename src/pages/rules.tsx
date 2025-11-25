import { ChangeEvent, useEffect, useState } from 'react';
import { Card, Accordion, AccordionItem, Button, Link } from '@heroui/react';

import { ExpandAllIcon, CollapseAllIcon } from '@/components/icons';
import { DefaultLayout } from '@/layouts/default';
import { title } from '@/components/primitives';
import { MarkdownText } from '@/components/common/markdown-text';
import { splitMarkdown, MarkdownSection } from '@/utils/split-markdown';
import { parseFrontMatter } from '@/utils/parse-front-matter';
import { SearchInput } from '@/components/common/search-input';
import { useDebouncedValue } from '@/hooks/use-debounced-value';

export const RulesPage = () => {
  const [sections, setSections] = useState<MarkdownSection[]>([]);
  const [meta, setMeta] = useState<Record<string, string>>();
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set(['1']));
  const [searchQuery, setSearchQuery] = useState('');

  const lang = 'en';
  const url = `/content/rules/${lang}.md`;
  const debouncedQuery = useDebouncedValue(searchQuery, 100);

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
    return (
      <Button
        className="text-default-700 w-fit"
        endContent={
          selectedKeys.size === sections.length ? (
            <CollapseAllIcon />
          ) : (
            <ExpandAllIcon />
          )
        }
        variant="light"
        onPress={handleToggleAll}
      >
        {selectedKeys.size === sections.length ? 'Collapse all' : 'Expand all'}
      </Button>
    );
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-left justify-center gap-4 py-8 md:py-10">
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
            {sections.length > 0 && (
              <div className="flex justify-start sm:justify-between w-full flex-col sm:flex-row gap-3">
                <SearchInput onChange={handleSearch} />
                <ToggleAllButton />
              </div>
            )}
            {sections.length === 0 ? (
              'Loading rules...'
            ) : (
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
            )}
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
    </DefaultLayout>
  );
};
