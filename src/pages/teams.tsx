import { Card, Tab, Tabs, Avatar, Alert, Link } from '@heroui/react';
import { title } from '@components/primitives';
import { useCallback, useEffect, useState } from 'react';
import { SortableTable, Column } from '@components/common/sortable-table';
import { CountryDisplay } from '@components/common/country-display';

type Registration = {
  user_id: number;
  username: string;
  discord_id: string | null;
  discord_username: string | null;
  country_code: string;
  global_rank: number;
  avatar_url: string | null;
};

export const TeamsPage = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const columns: Column<Registration>[] = [
    {
      key: 'username',
      label: 'Username',
      allowSorting: true,
    },
    {
      key: 'country_code',
      label: 'Country',
      allowSorting: true,
    },
    {
      key: 'global_rank',
      label: 'Global Rank',
      allowSorting: true,
      align: 'end',
    },
  ];

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const response = await fetch('/api/registrations?onlyValid=true');

        if (response.ok) {
          const data = await response.json();

          setRegistrations(data);
        } else {
          setError('Failed to fetch registrations');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchRegistrations();
  }, []);

  const tabContent = (title: string, content: React.ReactNode) => {
    return (
      <Card className="p-6 flex flex-col gap-3">
        <h1 className="text-lg font-semibold">{title}</h1>
        {content}
      </Card>
    );
  };

  const renderCell = useCallback(
    (item: Registration, columnKey: keyof Registration, value: any) => {
      switch (columnKey) {
        case 'username':
          return (
            <div className="flex items-center gap-4">
              <Avatar
                isBordered
                showFallback
                color="default"
                name={item.username ?? undefined}
                size="sm"
                src={item.avatar_url ?? undefined}
              />
              <Link
                isExternal
                className="text-foreground hover:underline whitespace-nowrap"
                href={`https://osu.ppy.sh/users/${item.user_id}`}
              >
                {value}
              </Link>
            </div>
          );
        case 'country_code':
          return <CountryDisplay countryCode={value} />;
        case 'global_rank':
          return `#${value.toLocaleString()}`;
        default:
          return value;
      }
    },
    []
  );

  return (
    <section className="flex flex-col items-start justify-center gap-4 pb-8 sm:py-8 w-full">
      <div className="inline-block w-full text-left justify-center">
        <span className={title()}>Teams</span>

        <div className="mt-6 flex flex-col w-full">
          <Tabs disabledKeys={['teams']} variant="solid">
            <Tab key="teams" title="Teams">
              {tabContent('Teams', '')}
            </Tab>
            <Tab key="registrations" title="Registrations">
              {tabContent(
                'Individual registrations',
                <>
                  {error && (
                    <Alert
                      color="danger"
                      description={error}
                      title="Error loading registrations"
                      variant="flat"
                    />
                  )}
                  {!error && (
                    <SortableTable
                      columns={columns}
                      defaultSortDescriptor={{
                        column: 'username',
                        direction: 'ascending',
                      }}
                      getRowKey={(p) => `${p.user_id}`}
                      isLoading={isLoading}
                      items={registrations}
                      numericKeys={['global_rank']}
                      renderCell={renderCell}
                    />
                  )}
                </>
              )}
            </Tab>
            <Tab key="by_country" title="By Country">
              {tabContent('Registrations by Country', '')}
            </Tab>
          </Tabs>
        </div>
      </div>
    </section>
  );
};
