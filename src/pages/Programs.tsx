import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronRight,
  FileText,
  BookOpen,
  PenTool,
  Download,
  Loader2,
} from 'lucide-react';
import { usePrograms } from '../hooks/usePrograms';
import { useResources } from '../hooks/useResources';
import { recordDownload } from '../lib/supabase';
import toast from 'react-hot-toast';

/* ───────── Brand palette (same as Home.tsx) ───────── */
const BRAND       = '#47677F';
const BRAND_LIGHT = '#5A7E97';    //  lighter tint
const BG_CREAM    = '#F7F3EF';    //  section background
const CARD_BG     = '#D5C6BD';    //  card fill

const Programs = () => {
  const [activeTab, setActiveTab] =
    useState<'undergraduate' | 'postgraduate'>('undergraduate');
  const [expandedProgram, setExpandedProgram] = useState<string | null>(null);
  const [expandedSemester, setExpandedSemester] = useState<string | null>(null);
  const [downloadingResources, setDownloadingResources] = useState<Set<string>>(new Set());

  const { programs, loading: programsLoading } = usePrograms();
  const { resources, loading: resourcesLoading } = useResources(expandedProgram || undefined);

  /* ───────── helpers ───────── */
  const toggleProgram   = (id: string) => {
    setExpandedProgram(expandedProgram === id ? null : id);
    setExpandedSemester(null);
  };
  const toggleSemester  = (id: string) =>
    setExpandedSemester(expandedSemester === id ? null : id);

  const handleDownload = async (resource: any) => {
    try {
      setDownloadingResources((prev) => new Set(prev).add(resource.id));
      await recordDownload(resource.id); // log in Supabase
      window.open(resource.file_url, '_blank');
      toast.success('Download started successfully!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to download file');
    } finally {
      setDownloadingResources((prev) => {
        const next = new Set(prev);
        next.delete(resource.id);
        return next;
      });
    }
  };

  const getResourcesByProgramAndSemester = (programId: string, sem: number) =>
    resources.filter((r) => r.program_id === programId && r.semester === sem);

  const iconFor = (type: string) =>
    ({
      previous_year_papers: FileText,
      study_material:       BookOpen,
      syllabus:             PenTool,
    }[type] || FileText);

  const typeLabel = (type: string) =>
    ({
      previous_year_papers: 'Previous Year Papers',
      study_material:       'Study Material',
      syllabus:             'Syllabus',
    }[type] || type);

  const currentPrograms = programs.filter((p) => p.type === activeTab);

  /* ───────── loading state ───────── */
  if (programsLoading)
    return (
      <div className="py-20 flex justify-center" style={{ backgroundColor: BG_CREAM }}>
        <Loader2 className="h-8 w-8 animate-spin" style={{ color: BRAND }} />
        <span className="ml-3 text-[#445365]">Loading programs…</span>
      </div>
    );

  /* ───────── UI ───────── */
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: BG_CREAM }}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#333] mb-4">Academic Programs</h1>
          <p className="text-lg text-[#555] max-w-3xl mx-auto">
            Choose your program and semester to access previous year papers, study materials,
            and syllabus
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div
            className="rounded-lg shadow-md p-1"
            style={{ backgroundColor: CARD_BG }}
          >
            {(['undergraduate', 'postgraduate'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-md font-semibold transition-all duration-200 ${
                  activeTab === tab
                    ? 'text-white'
                    : 'text-[#445365] hover:text-white'
                }`}
                style={{
                  backgroundColor: activeTab === tab ? BRAND : 'transparent',
                }}
              >
                {tab[0].toUpperCase() + tab.slice(1)} Programs
              </button>
            ))}
          </div>
        </div>

        {/* Programs grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {currentPrograms.map((program) => (
            <div
              key={program.id}
              className="rounded-lg border overflow-hidden shadow-lg"
              style={{ backgroundColor: CARD_BG, borderColor: `${BRAND_LIGHT}55` }}
            >
              {/* Program header */}
              <div
                onClick={() => toggleProgram(program.id)}
                className="px-6 py-4 cursor-pointer transition-opacity duration-150 hover:opacity-90"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-[#333]">{program.name}</h3>
                    <p className="text-sm text-[#555]">{program.specializations.join(', ')}</p>
                    <p className="text-xs" style={{ color: BRAND }}>
                      {program.semesters} Semester{program.semesters > 1 && 's'}
                    </p>
                  </div>
                  {expandedProgram === program.id ? (
                    <ChevronDown className="h-5 w-5 text-[#555]" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-[#555]" />
                  )}
                </div>
              </div>

              {/* Semesters */}
              {expandedProgram === program.id && (
                <div className="p-6">
                  {resourcesLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2
                        className="h-6 w-6 animate-spin"
                        style={{ color: BRAND }}
                      />
                      <span className="ml-2 text-[#555]">Loading resources…</span>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {Array.from(
                        { length: program.semesters },
                        (_, i) => i + 1
                      ).map((sem) => {
                        const semId = `${program.id}-sem-${sem}`;
                        const semResources = getResourcesByProgramAndSemester(
                          program.id,
                          sem
                        );

                        return (
                          <div
                            key={semId}
                            className="border rounded-lg"
                            style={{ borderColor: `${BRAND_LIGHT}55` }}
                          >
                            {/* Semester header */}
                            <div
                              onClick={() => toggleSemester(semId)}
                              className="px-4 py-3 rounded-t-lg cursor-pointer transition-colors duration-150"
                              style={{
                                backgroundColor: BG_CREAM,
                                borderBottom: `1px solid ${BRAND_LIGHT}55`,
                              }}
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-medium text-[#333]">
                                  Semester {sem}
                                </span>
                                <div className="flex items-center space-x-2">
                                  <span className="text-xs text-[#555]">
                                    {semResources.length} files
                                  </span>
                                  {expandedSemester === semId ? (
                                    <ChevronDown className="h-4 w-4 text-[#555]" />
                                  ) : (
                                    <ChevronRight className="h-4 w-4 text-[#555]" />
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Resources list */}
                            {expandedSemester === semId && (
                              <div className="p-4 space-y-3">
                                {semResources.length === 0 ? (
                                  <p className="text-sm text-[#666] text-center py-4">
                                    No resources available for this semester yet.
                                  </p>
                                ) : (
                                  semResources.map((r) => {
                                    const Icon = iconFor(r.type);
                                    const isDownloading = downloadingResources.has(r.id);

                                    return (
                                      <div
                                        key={r.id}
                                        className="flex items-center justify-between p-3 rounded-lg border transition-colors duration-150"
                                        style={{
                                          backgroundColor: CARD_BG,
                                          borderColor: `${BRAND_LIGHT}33`,
                                        }}
                                      >
                                        <div className="flex items-center space-x-3 flex-1">
                                          <div
                                            className="w-8 h-8 rounded-full flex items-center justify-center"
                                            style={{ backgroundColor: `${BRAND_LIGHT}33` }}
                                          >
                                            <Icon
                                              className="h-4 w-4"
                                              style={{ color: BRAND }}
                                            />
                                          </div>
                                          <div className="flex-1">
                                            <p className="font-medium text-[#333] text-sm">
                                              {r.title}
                                            </p>
                                            <p className="text-xs text-[#555]">
                                              {typeLabel(r.type)}
                                              {r.file_size && ` • ${r.file_size}`}
                                            </p>
                                          </div>
                                        </div>

                                        {/* Download button */}
                                        <button
                                          onClick={() => handleDownload(r)}
                                          disabled={isDownloading}
                                          className="flex items-center space-x-1 px-3 py-1 text-xs rounded-md transition-colors duration-150 disabled:opacity-50"
                                          style={{
                                            backgroundColor: BRAND,
                                            color: '#fff',
                                          }}
                                        >
                                          {isDownloading ? (
                                            <Loader2 className="h-3 w-3 animate-spin" />
                                          ) : (
                                            <Download className="h-3 w-3" />
                                          )}
                                          <span>
                                            {isDownloading ? 'Downloading…' : 'Download'}
                                          </span>
                                        </button>
                                      </div>
                                    );
                                  })
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Info box */}
        <div
          className="mt-12 rounded-lg p-6"
          style={{
            backgroundColor: CARD_BG,
            border: `1px solid ${BRAND_LIGHT}55`,
          }}
        >
          <div className="flex items-start space-x-3">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ backgroundColor: BRAND }}
            >
              <span className="text-white text-xs font-bold">i</span>
            </div>
            <div>
              <h4 className="font-semibold mb-2" style={{ color: BRAND }}>
                Note for Students
              </h4>
              <p className="text-sm" style={{ color: BRAND_LIGHT }}>
                All resources are regularly updated and verified for accuracy. If you
                notice any missing materials or have suggestions for additional
                resources, please contact the administration team.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Programs;
